using Domain.Objetos;
using Domain.Util;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServicios
{
    public interface IInventarioServicio
    {
        Task<List<Inventario>> GetAll();
        Task<List<Inventario>> GetAllBySucursalId(int idSucursal);
        Task<List<Inventario>> GetAllByProductoId(int idProducto);
        Task<Inventario> GetById(int id);
        Task<ResponseHelper> Create(Inventario inventario);
        Task<ResponseHelper> Edit(Inventario inventario);
        Task<ResponseHelper> Remove(int id);
    }
}
