using Domain.Objetos;
using Domain.Util;
using Microsoft.Extensions.Logging;
using Repository.Context;
using Repository.Repositorio;
using Services.IServicios;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.Servicios
{
    public class ProductoServicio : IProductoServicio
    {
        private readonly ProductoRepositorio _productoRepositorio;
        private readonly ILogger _logger;
        public ProductoServicio(ApplicationDbContext context, ILogger<ProductoServicio> logger)
        {
            _logger = logger;
            _productoRepositorio = new ProductoRepositorio(context);
        }

        public async Task<Producto> GetById(int id)
        {
            Producto producto = new Producto();
            try
            {
                producto = await _productoRepositorio.GetById(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return producto;
        }

        public async Task<ResponseHelper> Create(Producto producto)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                if (await _productoRepositorio.ExistsName(producto.Name))
                {
                    response.Message = $"Lo sentimos, el nombre: {producto.Name} que intenta guardar ya se encuentra registrado, pruebe con uno nuevo.";
                    response.Success = false;
                }
                else
                {
                    producto.FechaAlta = DateTime.Now;
                    if (await _productoRepositorio.Create(producto) > 0)
                    {
                        response.Message = $"Exito al crear el producto con el nombre: {producto.Name}";
                        response.Success = true;
                        _logger.LogInformation(response.Message);
                    }
                    else
                    {
                        response.Message = $"Error al crear el producto con el nombre: {producto.Name}";
                        response.Success = false;
                        _logger.LogInformation(response.Message);
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return response;
        }



        public async Task<ResponseHelper> Edit(Producto producto)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                if (await _productoRepositorio.ExistsNameWithOtherId(producto.Name, producto.Id))
                {
                    response.Message = $"Lo sentimos, el nombre: {producto.Name} que intenta guardar ya se encuentra registrado, pruebe con uno nuevo.";
                    response.Success = false;
                }
                else
                {
                    producto.RowVersion = DateTime.Now;

                    if (await _productoRepositorio.Edit(producto) > 0)
                    {
                        response.Message = $"Exito al editar el producto con el nombre: {producto.Name}";
                        response.Success = true;
                        _logger.LogInformation(response.Message);
                    }
                    else
                    {
                        response.Message = $"Error al editar el producto con el nombre: {producto.Name}";
                        response.Success = false;
                        _logger.LogInformation(response.Message);
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return response;
        }

        public async Task<ResponseHelper> Remove(int id)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                if (id <= 0)
                {
                    response.Message = $"Lo sentimos, No puede eliminar el producto";
                    response.Success = false;
                    _logger.LogInformation(response.Message);
                }
                else
                {
                    if (await _productoRepositorio.Remove(id) > 0)
                    {
                        response.Message = $"Producto eliminado con éxito";
                        response.Success = true;
                        _logger.LogInformation(response.Message);
                    }
                    else
                    {
                        response.Message = $"Error al intentar eliminar el producto.";
                        response.Success = false;
                        _logger.LogInformation(response.Message);
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                response.Success = false;
            }
            return response;
        }

        public async Task<List<Producto>> GetAll()
        {
            List<Producto> productos = new List<Producto>();
            try
            {
                productos = await _productoRepositorio.GetAll();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return productos;
        }
    }
}
