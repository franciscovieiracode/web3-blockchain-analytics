using Backend.Database;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Backend
{
    public class UsersController : Controller
    {
        private readonly LDSDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(LDSDBContext lDSDBContext, UserManager<ApplicationUser> userManager)
        {
            _context = lDSDBContext;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var users = _userManager.Users.ToList();
            if (users == null)
            {
                return NotFound();
            }
            return View(users);

        }

        [HttpGet]
        public async Task<IActionResult> Edit(String id)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(String id, ApplicationUser model)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            user.firstName = model.firstName;
            user.lastName = model.lastName;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            user.typeUser = model.typeUser;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return RedirectToAction("Index");
            }
            return RedirectToAction("Edit", new { id = user.Id });
        }

        [HttpPost]
        public async Task<IActionResult> DeletUser(String id)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {
                var result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index");
                }
            }
            return RedirectToAction("Index");
        }
    }
}