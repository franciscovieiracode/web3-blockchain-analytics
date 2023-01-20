using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Text.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly LDSDBContext _context;


        public ProfileController(UserManager<ApplicationUser> userManager, LDSDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        
        [HttpGet]
        [Route("getProfile")]
        public async Task<IActionResult> getProfile()
        {
            var user = _userManager.GetUserId(User);

            if (user != null)
            {
                var userData = _userManager.FindByEmailAsync(user);
                return Ok(new GetProfileResult()
                {
                    user = await userData,
                    result = true
                });
            }
            else
            {
                return BadRequest(new GetProfileResult()
                {
                    
                    result = false,
                });

            }
        }

        [Authorize]
        [HttpGet]
        [Route("getLoginHistory")]
        public async Task<IActionResult> getLoginHistory()
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.loginHistory.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.browser, x.ip, x.data });


            return Ok(new AddWalletResult()
            {
                result = true,
                address = JsonSerializer.Serialize(check)
            });
        }

    }
}
