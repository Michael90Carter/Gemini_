using Microsoft.AspNetCore.Mvc;

namespace Admin_Dashboard_.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
