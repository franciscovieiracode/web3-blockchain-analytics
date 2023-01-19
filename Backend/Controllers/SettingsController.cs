using Backend.Database;
using Backend.Models;
using Backend.Models.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;


        public SettingsController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }


        [HttpPut]
        [Route("updateProfileSettings")]
        public async Task<IActionResult> UpdateProfile(UpdateUserSettings model)
        {
            var user = _userManager.GetUserId(User);

            if (user != null)
            {
                var userData = await _userManager.FindByEmailAsync(user);

                userData.firstName = model.FirstName;
                userData.lastName = model.LastName;
                userData.Email = model.Email;
                userData.PhoneNumber = model.PhoneNumber;

                var result = await _userManager.UpdateAsync(userData);
                if (result.Succeeded)
                {
                    return Ok(new PutProfileResult()
                    {
                        result = true,
                        user = userData
                    });
                }
                else
                {
                    return BadRequest(new PutProfileResult()
                    {
                        result = false,
                    });
                }
            }
            else
            {
                return BadRequest(new PutProfileResult()
                {
                    result = false,
                });
            }
        }

        [HttpPut]
        [Route("updatePassword")]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordSettings model)
        {
            var user = _userManager.GetUserId(User);

            if (user != null)
            {
                var userData = await _userManager.FindByEmailAsync(user);
                var result = await _userManager.ChangePasswordAsync(userData, model.OldPassword, model.NewPassword);

                if (result.Succeeded)
                {
                    if (model.NewPassword != model.ConfirmPassword)
                    {
                        return BadRequest(new PutProfileResult()
                        {
                            result = false,
                            message = "New password and Confirm password do not match"
                        });
                    }
                    else
                    {
                        return Ok(new PutProfileResult()
                        {
                            result = true
                        });
                    }
                }
                else
                {
                    return BadRequest(new PutProfileResult()
                    {
                        result = false,
                        message = "Incorrect old password"
                    });
                }
            }
            else
            {
                return BadRequest(new PutProfileResult()
                {
                    result = false,
                    message = "User not found"
                });
            }
        }

        [HttpPut]
        [Route("updateCurrency")]
        public async Task<IActionResult> UpdateCurrency([FromBody] CurrencyModel model)
        {
            var user = _userManager.GetUserId(User);

            if (user != null)
            {
                var userData = await _userManager.FindByEmailAsync(user);

                userData.currency = model.Currency;

                var result = await _userManager.UpdateAsync(userData);
                if (result.Succeeded)
                {
                    return Ok(new PutProfileResult()
                    {
                        result = true,
                        user = userData
                    });
                }
                else
                {
                    return BadRequest(new PutProfileResult()
                    {
                        result = false,
                    });
                }
            }
            else
            {
                return BadRequest(new PutProfileResult()
                {
                    result = false,
                });
            }
        }

    }
}
