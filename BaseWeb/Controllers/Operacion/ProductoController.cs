using Domain.Objetos;
using Microsoft.AspNetCore.Mvc;
using Services.IServicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseWeb.Controllers.Operacion
{
    public class ProductoController : Controller
    {
        private readonly IProductoServicio _productServices;
        private readonly IInventarioServicio _inventoryServices;
        private readonly IBitacoraServicio _bitacoraServices;

        public ProductoController(IProductoServicio productServices, IInventarioServicio inventoryServices, IBitacoraServicio bitacoraServices)
        {
            _productServices = productServices;
            _inventoryServices = inventoryServices;
            _bitacoraServices = bitacoraServices;
        }

        public async Task<IActionResult> Index()
        {
            List<Producto> productos = await _productServices.GetAll();
            return View(productos);
        }

        public async Task<IActionResult> Details(int id)
        {
            Producto producto = await _productServices.GetById(id);
            if (producto == null)
            {
                return RedirectToAction("Index");
            }
            return View(producto);
        }

        [HttpGet]
        public async Task<IActionResult> _Create()
        {
            Producto producto = new Producto();
            return PartialView(producto);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Producto producto)
        {
            if (ModelState.IsValid)
            {
                var response = await _productServices.Create(producto);
                if (response.Success) // Validamos sí el producto se creó.
                {
                    Bitacora bitacora = new Bitacora();

                    bitacora.Accion = "Crear";
                    bitacora.NuevoValor = producto.Name;
                    bitacora.Objeto = "Producto";
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

        // GET: Producto/Edit/5
        public async Task<ActionResult> _Edit(int Id)
        {
            Producto producto = await _productServices.GetById(Id);
            if (producto != null)
            {
                return PartialView(producto);
            }
            return RedirectToAction("Index");
        }

        // POST: SucursalController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Producto producto)
        {
            if (ModelState.IsValid)
            {
                Bitacora bitacora = new Bitacora();

                bitacora.Accion = "Editar";
                bitacora.Objeto = "Producto";
                bitacora.Responsable = HttpContext.User.Identity.Name;

                var response = await _productServices.Edit(producto);

                if (response.Success) // Validamos sí el producto se editó correctamente.
                {
                    bitacora.NuevoValor = producto.Name;
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

            var response = await _productServices.Remove(id);
            if (response.Success) // Validamos sí la sucursal se eliminó.
            {
                Bitacora bitacora = new Bitacora();

                bitacora.Accion = "Eliminar";
                bitacora.NuevoValor = "N/A";
                bitacora.Objeto = "Producto";
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

        public async Task<ActionResult> Disponibilidad(int Id)
        {
            var lista = await _inventoryServices.GetAllByProductoId(Id);
            return View(lista);
        }
    }
}
