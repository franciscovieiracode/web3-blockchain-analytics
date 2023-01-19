using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Backend.Controllers
{
    public class HomeController : Controller
    {
        private readonly LDSDBContext lDSDBContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public HomeController(LDSDBContext lDSDBContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.lDSDBContext = lDSDBContext;
            this._userManager = userManager;
            this._signInManager = signInManager;
        }

        public IActionResult Index()
        {
            var users = _userManager.Users.Include(u => u.blockchains).Include(u => u.exchanges).Include(u => u.metamasks).ToList();
            if (users == null)
            {
                return NotFound();
            }
            var countAd = 0;
            var countUs = 0;
            var countBlockchains = 0;
            var countExchanges = 0;
            var countMetamasks = 0;
            var countAll = 0;
            foreach (var user in users)
            {
                if (user.typeUser == "User")
                {
                    countUs++;
                }
                else if (user.typeUser == "Admin")
                {
                    countAd++;
                }
                if (user.blockchains != null)
                {
                    countBlockchains += user.blockchains.Count;
                }
                if (user.exchanges != null)
                {
                    countExchanges += user.exchanges.Count;
                }
                if (user.metamasks != null)
                {
                    countMetamasks += user.metamasks.Count;
                }
                countAll = countBlockchains + countExchanges + countMetamasks;
            }
            
            var model = new CountViewModel()
            {
                CountAd = countAd,
                CountUs = countUs,
                CountAll = countAll,
            };
            return View(model);
        }
    }
}