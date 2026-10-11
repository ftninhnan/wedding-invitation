using Microsoft.AspNetCore.Mvc;

namespace WeddingInvitation.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return RedirectToAction("Invitation");
    }

    public IActionResult Invitation()
    {
        return View();
    }
}