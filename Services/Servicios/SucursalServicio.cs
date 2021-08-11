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
    public class SucursalServicio : ISucursalServicio
    {
        private readonly SucursalRepositorio _sucursalRepositorio;
        private readonly ILogger _logger;
        public SucursalServicio(ApplicationDbContext context, ILogger<SucursalServicio> logger)
        {
            _logger = logger;
            _sucursalRepositorio = new SucursalRepositorio(context);
        }
        public async Task<Sucursal> GetById(int id)
        {
            Sucursal sucursal = new Sucursal();
            try
            {
                sucursal = await _sucursalRepositorio.GetById(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return sucursal;
        }

        public async Task<ResponseHelper> Create(Sucursal sucursal)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                if (await _sucursalRepositorio.ExistsName(sucursal.Name))
                {
                    response.Message = $"Lo sentimos, el nombre: {sucursal.Name} que intenta guardar ya se encuentra registrado, pruebe con uno nuevo.";
                    response.Success = false;
                }
                else
                {
                    sucursal.FechaAlta = DateTime.Now;
                    if (await _sucursalRepositorio.Create(sucursal) > 0)
                    {
                        response.Message = $"Exito al crear la sucursal con el nombre: {sucursal.Name}";
                        response.Success = true;
                        _logger.LogInformation(response.Message);
                    }
                    else
                    {
                        response.Message = $"Error al crear la sucursal con el nombre: {sucursal.Name}";
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



        public async Task<ResponseHelper> Edit(Sucursal sucursal)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                if (await _sucursalRepositorio.ExistsNameWithOtherId(sucursal.Name, sucursal.Id))
                {
                    response.Message = $"Lo sentimos, el nombre: {sucursal.Name} que intenta guardar ya se encuentra registrado, pruebe con uno nuevo.";
                    response.Success = false;
                }
                else
                {
                    sucursal.RowVersion = DateTime.Now;

                    if (await _sucursalRepositorio.Edit(sucursal) > 0)
                    {
                        response.Message = $"Exito al ediatr la sucursal con el nombre: {sucursal.Name}";
                        response.Success = true;
                        _logger.LogInformation(response.Message);
                    }
                    else
                    {
                        response.Message = $"Error al editar la sucursal con el nombre: {sucursal.Name}";
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
                    response.Message = $"Lo sentimos, No puede eliminar la sucursal";
                    response.Success = false;
                    _logger.LogInformation(response.Message);
                }
                else
                {
                    if (await _sucursalRepositorio.Remove(id) > 0)
                    {
                        response.Message = $"Sucursal eliminada con éxito";
                        response.Success = true;
                        _logger.LogInformation(response.Message);
                    }
                    else
                    {
                        response.Message = $"Error al intentar eliminar la sucursal.";
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

        public async Task<List<Sucursal>> GetAll()
        {
            List<Sucursal> sucursales = new List<Sucursal>();
            try
            {
                sucursales = await _sucursalRepositorio.GetAll();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return sucursales;
        }
    }
}
