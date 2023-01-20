using Backend.Database;
using Backend.Models;
using Backend.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RulesController : Controller
    {
        private readonly LDSDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public RulesController(LDSDBContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [Authorize]
        [HttpGet]
        [Route("getRules")]
        public async Task<IActionResult> getRules()
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.rules.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.Name, x.Criteria, x.Behaviour, x.Tax }).ToArray();

            return Ok(new AddRulesResult()
            {
                result = true,
                rules = JsonSerializer.Serialize(check)
            });

        }

        [Authorize]
        [HttpPost]
        [Route("addRules")]
        public async Task<IActionResult> addRules([FromBody] AddRulesRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.rules.Where(x => x.Id == userData.Result.Id);

            var exists = check.Any(x => x.Criteria == requestDto.Criteria);

            if (!exists)
            {
                var rule = new Rules()
                {
                    Id = userData.Result.Id,
                    Name = requestDto.Name,
                    Description = requestDto.Description,
                    Criteria = requestDto.Criteria,
                    Behaviour = requestDto.Behaviour,
                    Tax = (decimal)requestDto.Tax,
                };
                _context.rules.Add(rule);
                _context.SaveChanges();

                return Ok(new AddRulesResult()
                {
                    result = true,
                    rules = rule.Name
                });
            }

            return BadRequest(new AddRulesResult()
            {
                result = false,
                reason = "Rule already added"
            });
        }

        [Authorize]
        [HttpPut]
        [Route("editRules")]
        public async Task<IActionResult> editRules([FromBody] AddRulesRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.rules.Where(x => x.Id == userData.Result.Id);

            var existingRule = check.FirstOrDefault(x => x.Criteria == requestDto.Criteria);
           
            if (existingRule != null)
            {
                existingRule.Name = requestDto.Name;
                existingRule.Description = requestDto.Description;
                existingRule.Behaviour = requestDto.Behaviour;
                existingRule.Tax = (decimal)requestDto.Tax;

                _context.rules.Update(existingRule);
                await _context.SaveChangesAsync();
                return Ok(new AddRulesResult()
                {
                    result = true,
                    rules = existingRule.Name
                });
            }
            return BadRequest(new AddRulesResult()
            {
                result = false,
                reason = "Rule already added"
            });
        }

        [Authorize]
        [HttpPost]
        [Route("deleteRules")]
        public async Task<IActionResult> deleteRules([FromBody] AddRulesRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.rules.Where(x => x.Id == userData.Result.Id);

            var existingRule = check.FirstOrDefault(x => x.Criteria == requestDto.Criteria);

            if (existingRule != null)
            {
                _context.rules.Remove(existingRule);
                _context.SaveChanges();
                return Ok(new AddRulesResult()
                {
                    result = true,
                    reason = "Deleted Rule"
                });
            }
            return BadRequest(new AddRulesResult()
            {
                result = false,
                reason = "Rules doesn't exist"
            });
        }


    }
}

