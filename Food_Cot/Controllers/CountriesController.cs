using Microsoft.AspNetCore.Mvc;

namespace Food_Cot.Controllers
{
    public class CountriesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
