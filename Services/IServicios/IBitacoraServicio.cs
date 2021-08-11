using Domain.Objetos;
using Domain.Util;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServicios
{
    public interface IBitacoraServicio
    {
        Task<List<Bitacora>> GetAll();
        Task<ResponseHelper> Create(Bitacora bitacora);
    }
}
