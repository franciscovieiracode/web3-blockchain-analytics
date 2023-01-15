using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers.Backend
{
    public class AuthBackendController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly LDSDBContext _context;

        public AuthBackendController(IConfiguration configuration, LDSDBContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}