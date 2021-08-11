using BaseWeb.Models;
using Domain.Objetos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Services.IServicios;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BaseWeb.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IBitacoraServicio _bitacoraServices;

        public HomeController(ILogger<HomeController> logger, IBitacoraServicio bitacoraServices)
        {
            _logger = logger;
            _bitacoraServices = bitacoraServices;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<IActionResult> Bitacora()
        {
            List<Bitacora> bitacoras = await _bitacoraServices.GetAll();
            return View(bitacoras);
        }

    }
}
