using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly LDSDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration, LDSDBContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] UserRegister requestDto)
        {
            if (ModelState.IsValid)
            {
                //check if users exist
                var user_exist = await _userManager.FindByEmailAsync(requestDto.Email);

                if (user_exist != null)
                {
                    return BadRequest(new AuthResult()
                    {
                        Result = false,
                        Error = "Email already exists"
                    });
                }
                //create user
                var new_user = new ApplicationUser()
                {
                    UserName = requestDto.Email,
                    Email = requestDto.Email,
                    firstName = requestDto.FirstName,
                    lastName = requestDto.LastName,
                    img = "user.png",
                    typeUser = "User",
                    lastVisit = DateTime.Now,
                    currency = "Euro"
                };

                var is_created = await _userManager.CreateAsync(new_user, requestDto.Password);

                //check if user was created sucessfully
                if (is_created.Succeeded)
                {
                    var token = GenerateJwtToken(new_user);

                    return Ok(new AuthResult()
                    {
                        Result = true,
                        Token = token
                    });
                }

                return BadRequest(new AuthResult()
                {
                    Result = false,
                    Error = "Server Error1"
                });
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login loginRequest)
        {
            if (ModelState.IsValid)
            {
                var existing_user = await _userManager.FindByEmailAsync(loginRequest.Email);
                if (existing_user == null)
                {
                    return BadRequest(new AuthResult()
                    {
                        Result = false,
                        Error = "User does not exist"
                    });
                }

                var isCorrect = await _userManager.CheckPasswordAsync(existing_user, loginRequest.Password);

                if (!isCorrect)
                {
                    return BadRequest(new AuthResult()
                    {
                        Result = false,
                        Error = "Invalid credentials"
                    });
                }
                var check = _context.loginHistory.Where(x => x.Id == existing_user.Id);
                var userAgent = HttpContext.Request.Headers["User-Agent"];
                var loginHistory = new LoginHistory(){
                  browser = userAgent,
                  ip = "77.54.163.233",
                  data =DateTime.Now.ToString(),
                  Id= existing_user.Id
                };
                _context.loginHistory.Add(loginHistory);
                _context.SaveChanges();
                var jwtToken = GenerateJwtToken(existing_user);
                return Ok(new AuthResult()
                {
                    Result = true,
                    Token = jwtToken
                });
            }
            return BadRequest(new AuthResult()
            {
                Result = false,
                Error = "Invalid payload2"
            });
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToUniversalTime().ToString())

                }),
                Expires = DateTime.Now.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
        
    }
}
