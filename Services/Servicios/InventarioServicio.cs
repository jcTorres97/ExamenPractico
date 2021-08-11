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
    public class InventarioServicio : IInventarioServicio
    {
        private readonly InventarioRepositorio _inventarioRepositorio;
        private readonly ILogger _logger;
        public InventarioServicio(ApplicationDbContext context, ILogger<InventarioServicio> logger)
        {
            _logger = logger;
            _inventarioRepositorio = new InventarioRepositorio(context);
        }

        public async Task<Inventario> GetById(int id)
        {
            Inventario inventario = new Inventario();
            try
            {
                inventario = await _inventarioRepositorio.GetById(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return inventario;
        }

        public async Task<ResponseHelper> Create(Inventario inventario)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {               
                inventario.FechaAlta = DateTime.Now;
                if (await _inventarioRepositorio.Create(inventario) > 0)
                {
                    response.Message = $"Exito al crear el inventario";
                    response.Success = true;
                    _logger.LogInformation(response.Message);
                }
                else
                {
                    response.Message = $"Error al crear el inventario";
                    response.Success = false;
                    _logger.LogInformation(response.Message);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return response;
        }



        public async Task<ResponseHelper> Edit(Inventario inventario)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                inventario.RowVersion = DateTime.Now;

                if (await _inventarioRepositorio.Edit(inventario) > 0)
                {
                    response.Message = $"Exito al editar el inventario";
                    response.Success = true;
                    _logger.LogInformation(response.Message);
                }
                else
                {
                    response.Message = $"Error al editar el inventario";
                    response.Success = false;
                    _logger.LogInformation(response.Message);
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
                    response.Message = $"Lo sentimos, No puede eliminar el inventario";
                    response.Success = false;
                    _logger.LogInformation(response.Message);
                }
                else
                {
                    if (await _inventarioRepositorio.Remove(id) > 0)
                    {
                        response.Message = $"Inventario eliminado con éxito";
                        response.Success = true;
                        _logger.LogInformation(response.Message);
                    }
                    else
                    {
                        response.Message = $"Error al intentar eliminar el inventario.";
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

        public async Task<List<Inventario>> GetAll()
        {
            List<Inventario> inventarios = new List<Inventario>();
            try
            {
                inventarios = await _inventarioRepositorio.GetAll();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return inventarios;
        }

        public async Task<List<Inventario>> GetAllBySucursalId(int idSucursal)
        {
            List<Inventario> inventarios = new List<Inventario>();
            List<Inventario> inventariosAux = new List<Inventario>();
            try
            {
                inventariosAux = await _inventarioRepositorio.GetAll();
                inventarios = inventariosAux.FindAll(x => x.IdSucursal == idSucursal);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return inventarios;
        }

        public async Task<List<Inventario>> GetAllByProductoId(int idProducto)
        {
            List<Inventario> inventarios = new List<Inventario>();
            List<Inventario> inventariosAux = new List<Inventario>();
            try
            {
                inventariosAux = await _inventarioRepositorio.GetAll();
                inventarios = inventariosAux.FindAll(x => x.IdProducto == idProducto);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return inventarios;
        }
    }
}
