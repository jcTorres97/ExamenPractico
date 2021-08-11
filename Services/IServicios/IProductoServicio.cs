using Domain.Objetos;
using Domain.Util;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServicios
{
    public interface IProductoServicio
    {
        Task<List<Producto>> GetAll();
        Task<Producto> GetById(int id);
        Task<ResponseHelper> Create(Producto producto);
        Task<ResponseHelper> Edit(Producto producto);
        Task<ResponseHelper> Remove(int id);
    }
}
