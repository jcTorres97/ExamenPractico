using Domain.Objetos;
using Microsoft.AspNetCore.Mvc;
using Services.IServicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseWeb.Controllers.Operacion
{
    public class SucursalController : Controller
    {
        private readonly ISucursalServicio _sucursalServices;
        private readonly IInventarioServicio _inventoryServices;

        public SucursalController(ISucursalServicio sucursalServices, IInventarioServicio inventoryServices)
        {
            _sucursalServices = sucursalServices;
            _inventoryServices = inventoryServices;
        }

        public async Task<IActionResult> Index()
        {
            var lista = await _sucursalServices.GetAll();
            return View(lista);
        }

        public async Task<IActionResult> Details(int id)
        {
            Sucursal sucursal = await _sucursalServices.GetById(id);
            if (sucursal == null)
            {
                return RedirectToAction("Index");
            }
            return View(sucursal);
        }

        [HttpGet]
        public async Task<IActionResult> _Create()
        {
            Sucursal sucursal = new Sucursal();
            return PartialView(sucursal);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Sucursal sucursal)
        {
            if (ModelState.IsValid)
            {
                var response = await _sucursalServices.Create(sucursal);
                if (response.Success) // Validamos sí la sucursal se creó.
                {
                    return Json(new { success = response.Success, msj = response.Message, });
                }
                else
                {
                    ModelState.AddModelError("modelError", response.Message);
                    return Json(new { success = response.Success, msj = response.Message });
                }
            }
            return Json(new { success = false, msj = "¡Verifica que los datos esten completos y sean correctos, si el problema continua comunicate con el administrador!" });


        }

        // GET: SucursalController/Edit/5
        public async Task<ActionResult> _Edit(int Id)
        {
            Sucursal sucursal = await _sucursalServices.GetById(Id);
            if (sucursal != null)
            {
                return PartialView(sucursal);
            }
            return RedirectToAction("Index");
        }

        // POST: SucursalController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Sucursal sucursal)
        {
            if (ModelState.IsValid)
            {
                var response = await _sucursalServices.Edit(sucursal);
                if (response.Success) // Validamos sí la sucursal se editó correctamente.
                {
                    return Json(new { success = response.Success, msj = response.Message });
                }
                else
                {
                    ModelState.AddModelError("modelError", response.Message);
                    return Json(new { success = response.Success, msj = response.Message });
                }
            }
            return Json(new { success = false, msj = "¡Verifica que los datos esten completos y sean correctos, si el problema continua comunicate con el administrador!" });

        }

        public async Task<IActionResult> RemoveConfirmed(int id)
        {
            if (id <= 0) // Validamos que el id no sea nulo o que contenga un valor negativo.
            {
                return RedirectToAction("Index");
            }
            var response = await _sucursalServices.Remove(id);
            if (response.Success) // Validamos sí la sucursal se eliminó.
            {
                return Json(new { success = response.Success, msj = response.Message });
            }
            else
            {
                ModelState.AddModelError("modelError", response.Message);
                return Json(new { success = response.Success, msj = response.Message });
            }
        }

        public async Task<ActionResult> Inventario(int Id)
        {
            var lista = await _inventoryServices.GetAllBySucursalId(Id);
            return View(lista);
        }
    }
}
