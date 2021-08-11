using Domain.Objetos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Services.IServicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseWeb.Controllers.Operacion
{
    public class InventarioController : Controller
    {
        private readonly IInventarioServicio _inventoryServices;
        private readonly ISucursalServicio _sucursalServices;
        private readonly IProductoServicio _productServices;

        public InventarioController(IInventarioServicio inventoryServices, ISucursalServicio sucursalServices, IProductoServicio productServices)
        {
            _inventoryServices = inventoryServices;
            _sucursalServices = sucursalServices;
            _productServices = productServices;
        }

        public async Task<IActionResult> Index()
        {
            List<Inventario> inventarios = await _inventoryServices.GetAll();
            return View(inventarios);
        }

        public async Task<IActionResult> Details(int id)
        {
            Inventario inventario = await _inventoryServices.GetById(id);
            if (inventario == null)
            {
                return RedirectToAction("Index");
            }
            return View(inventario);
        }

        [HttpGet]
        public async Task<IActionResult> _Create()
        {
            ViewBag.Sucursales = new SelectList(await _sucursalServices.GetAll(), nameof(Sucursal.Id), nameof(Sucursal.Name));
            ViewBag.Products = new SelectList(await _productServices.GetAll(), nameof(Producto.Id), nameof(Producto.Name));
            Inventario inventario = new Inventario();
            return PartialView(inventario);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Inventario inventario)
        {
            if (ModelState.IsValid)
            {
                var response = await _inventoryServices.Create(inventario);
                if (response.Success) // Validamos sí el inventario se creó.
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

        // GET: Inventario/Edit/5
        public async Task<ActionResult> _Edit(int Id)
        {
            Inventario inventario = await _inventoryServices.GetById(Id);
            ViewBag.Sucursales = new SelectList(await _sucursalServices.GetAll(), nameof(Sucursal.Id), nameof(Sucursal.Name));
            ViewBag.Products = new SelectList(await _productServices.GetAll(), nameof(Producto.Id), nameof(Producto.Name));
            if (inventario != null)
            {
                return PartialView(inventario);
            }
            return RedirectToAction("Index");
        }

        // POST: SucursalController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Inventario inventario)
        {
            if (ModelState.IsValid)
            {
                var response = await _inventoryServices.Edit(inventario);
                if (response.Success) // Validamos sí el inventario se editó correctamente.
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
            var response = await _inventoryServices.Remove(id);
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
    }
}
