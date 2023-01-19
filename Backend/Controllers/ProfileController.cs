using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        
        public ProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
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
    }
}
