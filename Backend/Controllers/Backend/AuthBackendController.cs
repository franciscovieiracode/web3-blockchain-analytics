using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers.Backend
{
    public class AuthBackendController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
