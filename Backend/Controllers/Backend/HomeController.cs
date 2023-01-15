using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly LDSDBContext lDSDBContext;
        public HomeController(LDSDBContext lDSDBContext)
        {
            this.lDSDBContext = lDSDBContext;
        }

        public async Task<IActionResult> Index()
        {
            //var users = await lDSDBContext.ListUsers.ToListAsync();
            //return View(users);
            return View();
        }
    }
}