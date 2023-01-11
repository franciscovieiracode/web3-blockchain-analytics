using Microsoft.AspNetCore.Mvc;

namespace server.Controllers.Backend
{
    public class Auth2Controller : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
