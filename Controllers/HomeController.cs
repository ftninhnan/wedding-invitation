using Microsoft.AspNetCore.Mvc;

namespace WeddingInvitation.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Invitation()
    {
        return View();
    }
}