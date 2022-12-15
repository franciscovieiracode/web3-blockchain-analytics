using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            List<Employee> emplooyes = new List<Employee>()
            {
                new Employee { Img = "./images/user.png", FirstName= "João",LastName= "Alberto",Email= "JB@gmail.com",Role= "User",LastVisitme= "12/01/2022"},
                new Employee { Img = "./images/user.png", FirstName= "Bernard",LastName= "Pena",Email= "BP@gmail.com",Role= "User",LastVisitme= "14/12/2022"},
                new Employee { Img = "./images/user.png", FirstName= "Marcelo",LastName= "Barbosa",Email= "MB@gmail.com",Role= "Admin",LastVisitme= "04/03/2022"},
                new Employee { Img = "./images/user.png", FirstName= "Jose",LastName= "Pereira",Email= "JP@gmail.com",Role= "Admin",LastVisitme= "01/07/2022"},
                new Employee { Img = "./images/user.png", FirstName= "Francisco ",LastName= "Vieira",Email= "FV@gmail.com",Role= "Admin",LastVisitme= "15/07/2022"},
                new Employee { Img = "./images/user.png", FirstName= "Pedro ",LastName= "Teixeira ",Email= "PT@gmail.com",Role= "Admin",LastVisitme= "21/07/2022"},
            };
            return View(emplooyes);
        }

        public IActionResult Edit()
        {
            return View();
        }
    }
}
