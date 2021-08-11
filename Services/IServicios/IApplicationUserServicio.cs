using Domain.AspNet;
using Domain.Objetos;
using Domain.Util;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServicios
{
    public interface IApplicationUserServicio
    {
        Task<List<ApplicationUser>> ObtenerLista();
        Task<List<ApplicationUser>> ObtenerListaEliminados();
        Task<ApplicationUser> BuscarPorId(string id);
        Task<ResponseHelper> Crear(ApplicationUser applicationUser);
        Task<ResponseHelper> Editar(ApplicationUser applicationUser);
        Task<ResponseHelper> Eliminar(string id);
        Task<bool> ValidarPorNombreUsuario(string userName, string id);
        Task<bool> ValidarPorEmail(string userName, string id);
        string Name { get; }
        bool IsAuthenticated();
        IEnumerable<Claim> GetClaimsIdentity();
        Task<int?> ObtenerIdPersonaPorUsuario();
        string GetIdIdentity();
        List<string> GetRoles();
        Task<string> ObtenerNombre();
        Task<string> ObtenerCorreo();
        Task<ApplicationUser> ObtenerUsuario(string id);
        Task<ApplicationUser> ObtenerUsuarioEmail(string amail);
        Task<ApplicationUser> ObtenerUsuarioPorIdPersona(int? id);
        Task<ApplicationUser> ValidarExistenteEliminadoPorEmail(string email);
        Task<ApplicationUser> ValidarExistenteEliminadoPorUsername(string username);
        Task<Persona> ObtenerPersonaPorEmail(string email);
        Task<Persona> ObtenerPersonaPorId(int? id);
        string StringDomain();
        Task<string> ObtenerEmailPersonaPorUsuario();
        
        Task<List<ApplicationRole>> ObtenerListaRoles();
    }
}
