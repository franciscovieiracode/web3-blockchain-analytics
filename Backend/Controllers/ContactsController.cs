using Backend.Database;
using Backend.Models;
using Backend.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using System.Text.Json;
using System.Text.Json.Serialization;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : Controller
    {
        private readonly LDSDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public ContactsController(LDSDBContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;

        }

        [Authorize]
        [HttpGet]
        [Route("getContacts")]
        public async Task<IActionResult> getContacts()
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.contacts.Where(x => x.Id == userData.Result.Id)
                .Select(x => new { x.WalletName, x.WalletAddress }).ToArray();

            return Ok(new AddContactsResult()
            {
                result = true,
                contacts = JsonSerializer.Serialize(check)
            });

        }



        [Authorize]
        [HttpPost]
        [Route("addContacts")]
        public async Task<IActionResult> addContacts([FromBody] AddContactsRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.contacts.Where(x => x.Id == userData.Result.Id);

            var exists = check.Any(x => x.WalletAddress == requestDto.WalletAddress);

            if (!exists)
            {
                var contact = new Contacts()
                {
                    WalletAddress = requestDto.WalletAddress,
                    WalletName = requestDto.WalletName,
                    Id = userData.Result.Id

                };
                _context.contacts.Add(contact);
                _context.SaveChanges();

                return Ok(new AddContactsResult()
                {
                    result = true,
                    contacts = contact.WalletName
                });
            }

            return BadRequest(new AddContactsResult()
            {
                result = false,
                reason = "Contact already added"
            });
        }

        [Authorize]
        [HttpPut]
        [Route("editContacts")]
        public async Task<IActionResult> editContacts([FromBody] AddContactsRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData =  _userManager.FindByEmailAsync(user);

            var check =  _context.contacts.Where(x => x.Id == userData.Result.Id);

            var existingContact = check.FirstOrDefault(x => x.WalletAddress == requestDto.WalletAddress);

            if (existingContact != null)
            {
                existingContact.WalletName = requestDto.WalletName;
                _context.contacts.Update(existingContact);
                await _context.SaveChangesAsync();
                return Ok(new AddContactsResult()
                {
                    result = true,
                    contacts = existingContact.WalletName
                });
            }
            return BadRequest(new AddContactsResult()
            {
                result = false,
                reason = "Contact already added"
            });
        }

        [Authorize]
        [HttpPost]
        [Route("deleteContacts")]
        public async Task<IActionResult> deleteContacts([FromBody] AddContactsRequest requestDto)
        {
            var user = _userManager.GetUserId(User);
            var userData = _userManager.FindByEmailAsync(user);

            var check = _context.contacts.Where(x => x.Id == userData.Result.Id);

            var existingContact = check.FirstOrDefault(x => x.WalletAddress == requestDto.WalletAddress);

            if (existingContact != null)
            {
                _context.contacts.Remove(existingContact);
                _context.SaveChanges();
                return Ok(new AddContactsResult()
                {
                    result = true,
                    reason = "Delete Contact"
                });
            }
            return BadRequest(new AddContactsResult()
            {
                result = false,
                reason = "Contact doesn't exist"
            });
        }
    }
}
