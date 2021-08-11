using Domain.Objetos;
using Domain.Util;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServicios
{
    public interface ISucursalServicio
    {
        Task<List<Sucursal>> GetAll();
        Task<Sucursal> GetById(int id);
        Task<ResponseHelper> Create(Sucursal sucursal);
        Task<ResponseHelper> Edit(Sucursal sucursal);
        Task<ResponseHelper> Remove(int id);
    }
}
