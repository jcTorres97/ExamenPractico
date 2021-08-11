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
        private readonly IBitacoraServicio _bitacoraServices;

        public SucursalController(ISucursalServicio sucursalServices, IInventarioServicio inventoryServices, IBitacoraServicio bitacoraServices)
        {
            _sucursalServices = sucursalServices;
            _inventoryServices = inventoryServices;
            _bitacoraServices = bitacoraServices;
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
                    Bitacora bitacora = new Bitacora();

                    bitacora.Accion = "Crear";
                    bitacora.NuevoValor = sucursal.Name;
                    bitacora.Objeto = "Sucursal";
                    bitacora.Responsable = HttpContext.User.Identity.Name;

                    await _bitacoraServices.Create(bitacora);
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

                Bitacora bitacora = new Bitacora();

                bitacora.Accion = "Editar";
                bitacora.Objeto = "Sucursal";
                bitacora.Responsable = HttpContext.User.Identity.Name;

                if (response.Success) // Validamos sí la sucursal se editó correctamente.
                {
                    bitacora.NuevoValor = sucursal.Name;
                    await _bitacoraServices.Create(bitacora);
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
                Bitacora bitacora = new Bitacora();

                bitacora.Accion = "Eliminar";
                bitacora.NuevoValor = "N/A";
                bitacora.Objeto = "Sucursal";
                bitacora.Responsable = HttpContext.User.Identity.Name;

                await _bitacoraServices.Create(bitacora);
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
