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
    public class BitacoraServicio : IBitacoraServicio
    {
        private readonly BitacoraRepositorio _bitacoraRepositorio;
        private readonly ILogger _logger;
        public BitacoraServicio(ApplicationDbContext context, ILogger<BitacoraServicio> logger)
        {
            _logger = logger;
            _bitacoraRepositorio = new BitacoraRepositorio(context);
        }

        public async Task<ResponseHelper> Create(Bitacora bitacora)
        {
            ResponseHelper response = new ResponseHelper();
            try
            {
                bitacora.Fecha = DateTime.Now;
                await _bitacoraRepositorio.Create(bitacora);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return response;
        }

        public async Task<List<Bitacora>> GetAll()
        {
            List<Bitacora> bitacoras = new List<Bitacora>();
            try
            {
                bitacoras = await _bitacoraRepositorio.GetAll();
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return bitacoras;
        }
    }
}
