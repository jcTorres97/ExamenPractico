using Domain.AspNet;
using Domain.Objetos;
using Domain.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Repository.Context;
using Repository.Repositorio;
using Services.IServicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.Servicios
{
    public class ApplicationUserServicio : IApplicationUserServicio
    {
        private readonly ApplicationUserRepositorio _applicationUserRepository;
        private readonly IHttpContextAccessor _accessor;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<ApplicationUserServicio> _logger;

        public ApplicationUserServicio(ApplicationDbContext context, ILogger<ApplicationUserServicio> logger, IHttpContextAccessor accessor, UserManager<ApplicationUser> userManager)
        {
            _applicationUserRepository = new ApplicationUserRepositorio(context);
            _logger = logger;
            _accessor = accessor;
            _userManager = userManager;
        }

        public string Name => throw new NotImplementedException();

        /// <summary>
        /// Servicio que busca a un usuario a través de su id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> BuscarPorId(string id)
        {
            var applicationUser = new ApplicationUser();
            try
            {
                applicationUser = await _applicationUserRepository.BuscarPorId(id);
            }
            catch (Exception p)
            {
                _logger.LogError(p.Message);
            }
            return applicationUser;
        }

        /// <summary>
        /// Servicio que crea un usuario nuevo. Recibe un objeto de tipo ApplicationUser.
        /// </summary>
        /// <param name="applicationUser"></param>
        /// <returns></returns>
        public async Task<ResponseHelper> Crear(ApplicationUser applicationUser)
        {
            var response = new ResponseHelper();
            try
            {
                if (await _applicationUserRepository.Crear(applicationUser) > 0)
                {
                    response.Success = true;
                    response.Message = "Creación exitosa";
                    _logger.LogInformation(response.Message);
                }
            }
            catch (Exception p)
            {
                response.Success = false;
                response.Message = "Error al Crear un usuario";
                _logger.LogError(p.Message);
            }
            return response;
        }

        /// <summary>
        /// Servicio que edita la información de un usuario. Recibe un objeto de tipo ApplicationUser.
        /// </summary>
        /// <param name="applicationUser"></param>
        /// <returns></returns>
        public async Task<ResponseHelper> Editar(ApplicationUser applicationUser)
        {
            var response = new ResponseHelper();
            try
            {
                if (applicationUser.EmailConfirmed != true)
                {
                    applicationUser.EmailConfirmed = true;
                }

                if (await _applicationUserRepository.Editar(applicationUser) > 0)
                {
                    response.Success = true;
                    response.Message = "Exito al editar";
                    _logger.LogInformation(response.Message);
                }
            }
            catch (Exception p)
            {
                response.Success = false;
                response.Message = "Error al editar";
                _logger.LogError(p.Message);
            }
            return response;
        }

        /// <summary>
        /// Servicio que elimina a un usuario a través de su id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ResponseHelper> Eliminar(string id)
        {
            var response = new ResponseHelper();
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user.Email.Equals("admin@admin.com") || user.Email.Equals("root@admin.com")) // Validamos que el usuario que se desea eliminar no sea administrador o root.
                {
                    response.Success = false;
                    response.Message = "No se puede eiminar el usuario administrador";
                    _logger.LogInformation(response.Message);
                }
                else
                {
                    var validacion = await _userManager.DeleteAsync(user);
                    if (validacion.Succeeded) // Validamos que la eliminación haya sido correcta.
                    {
                        response.Success = true;
                        response.Message = "Creado con exito";
                        _logger.LogInformation(response.Message);
                    }
                }
            }
            catch (Exception p)
            {
                response.Success = false;
                response.Message = "Error al eliminar";
                _logger.LogError(p.Message);
            }
            return response;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Claim> GetClaimsIdentity()
        {
            return _accessor.HttpContext.User.Claims;
        }

        /// <summary>
        /// Servicio que obtiene la información del usuario que se encuentra loggeado.
        /// </summary>
        /// <returns></returns>
        public string GetIdIdentity()
        {
            string id = "";
            try
            {
                if (_accessor.HttpContext.User.Claims != null && _accessor.HttpContext.User.Claims.Any())
                {
                    id = _accessor.HttpContext.User.Claims.FirstOrDefault().Value;
                }
            }
            catch (Exception p)
            {
                _logger.LogError(p.Message);
            }
            return id;
        }

        /// <summary>
        /// Servicio que obtiene los roles.
        /// </summary>
        /// <returns></returns>
        public List<string> GetRoles()
        {
            List<string> roles = new List<string>();
            try
            {
                roles = _accessor.HttpContext.User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            }
            catch (Exception p)
            {
                _logger.LogError(p.Message);
            }
            return roles;
        }

        public bool IsAuthenticated()
        {
            return _accessor.HttpContext.User.Identity.IsAuthenticated;
        }

        /// <summary>
        /// Servicio que obtiene el id de la persona que se encuentra logueada.
        /// </summary>
        /// <returns></returns>
        public async Task<int?> ObtenerIdPersonaPorUsuario()
        {
            string usuario = _accessor.HttpContext.User.Identity.Name;
            int? value;
            try
            {
                value = await _applicationUserRepository.ObtenerIdPersonaPorIdUsuario(usuario);
            }
            catch (Exception pr)
            {
                value = null;
                _logger.LogError(pr.Message);
            }
            return value;
        }

        /// <summary>
        /// Servicio que retorna una lista de usuarios.
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationUser>> ObtenerLista()
        {
            var lista = new List<ApplicationUser>();
            try
            {
                lista = await _applicationUserRepository.ObtenerLista();
            }
            catch (Exception p)
            {
                _logger.LogError(p.Message);
            }
            return lista;
        }

        /// <summary>
        /// Servicio que retorna una lista de todos usuarios incluyendo los eliminados.
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationUser>> ObtenerListaEliminados()
        {
            var lista = new List<ApplicationUser>();
            try
            {
                lista = await _applicationUserRepository.ObtenerListaEliminados();
            }
            catch (Exception p)
            {
                _logger.LogError(p.Message);
            }
            return lista;
        }

        /// <summary>
        /// Servicio que obtiene el nombre del usuario logueado.
        /// </summary>
        /// <returns></returns>
        public async Task<string> ObtenerNombre()
        {
            string nombre = "";
            try
            {
                var id = GetIdIdentity();
                ApplicationUser usuario = await BuscarPorId(id);
                if (usuario != null)
                {
                    nombre = usuario.Persona != null ? usuario.Persona.Nombre : usuario.Email;
                }
            }
            catch (Exception pr)
            {
                _logger.LogError(pr.Message);
            }
            return nombre;
        }

        public async Task<string> ObtenerCorreo()
        {
            string correo = "";
            try
            {
                var id = GetIdIdentity();
                ApplicationUser usuario = await BuscarPorId(id);
                if (usuario != null)
                {
                    correo = usuario.Email;
                }

            }
            catch (Exception pr)
            {
                _logger.LogError(pr.Message);
            }
            return correo;
        }

        public async Task<ApplicationUser> ObtenerUsuario(string id)
        {
            ApplicationUser applicationUser = new ApplicationUser();
            try
            {
                applicationUser = await _applicationUserRepository.ObtenerUsuario(id);
            }
            catch (Exception e)
            {

                _logger.LogError(e.Message);
            }
            return applicationUser;
        }

        /// <summary>
        /// Servicio que obtiene un usuario por el id persona.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> ObtenerUsuarioPorIdPersona(int? id)
        {
            var user = new ApplicationUser();
            try
            {
                user = await _applicationUserRepository.ObtenerUsuarioPorIdPersona(id);
            }
            catch (Exception pr)
            {
                _logger.LogError(pr.Message);
            }
            return user;
        }


        public string StringDomain()
        {
            return string.Concat(
                        _accessor.HttpContext.Request.Scheme,
                        "://",
                        _accessor.HttpContext.Request.Host.ToUriComponent(),
                        _accessor.HttpContext.Request.PathBase.ToUriComponent()
                       );
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> ValidarExistenteEliminadoPorEmail(string email)
        {
            ApplicationUser usuarios = null;
            try
            {
                usuarios = await _applicationUserRepository.ValidarExistenteEliminadoPorEmail(email);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return usuarios;
        }
        /// <summary>
        /// Metodo que busca a una persona por medio del email
        /// </summary>
        /// <param name="correo"></param>
        /// <returns></returns>
        public async Task<Persona> ObtenerPersonaPorEmail(string correo)
        {
            Persona persona = new Persona();
            try
            {
                persona = await _applicationUserRepository.obtenerPersonaPorEmail(correo);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return persona;
        }

        /// <summary>
        /// Servicio que valida que el username ya se ecuentre registrado ya sea usuario activo o eliminado.
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> ValidarExistenteEliminadoPorUsername(string username)
        {
            ApplicationUser usuarios = null;
            try
            {
                usuarios = await _applicationUserRepository.ValidarExistenteEliminadoPorUsername(username);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return usuarios;
        }

        /// <summary>
        /// Servicio que valida qie el email exista.
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> ValidarPorEmail(string email, string id)
        {
            bool resultado = false;
            try
            {
                resultado = await _applicationUserRepository.ValidarPorEmail(email, id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return resultado;
        }

        /// <summary>
        /// Servicio que valida que exista el nombre registrado.
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> ValidarPorNombreUsuario(string userName, string id)
        {
            bool resultado = false;
            try
            {
                resultado = await _applicationUserRepository.ValidarPorNombreUsuario(userName, id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return resultado;
        }

        public async Task<Persona> ObtenerPersonaPorId(int? id)
        {
            Persona persona = new Persona();
            try
            {
                persona = await _applicationUserRepository.obtenerPersonaPorId(id);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return persona;
        }
        /// <summary>
        /// Metodo para obtener a un usuario por medio del correo
        /// </summary>
        /// <param name="amail"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> ObtenerUsuarioEmail(string email)
        {
            ApplicationUser applicationUser = new ApplicationUser();
            try
            {
                applicationUser = await _applicationUserRepository.ObtenerUsuarioPorEmail(email);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
            }
            return applicationUser;
        }

        /// <summary>
        /// Servicio que obtiene el id de la persona que se encuentra logueada.
        /// </summary>
        /// <returns></returns>
        public async Task<string> ObtenerEmailPersonaPorUsuario()
        {
            string usuario = _accessor.HttpContext.User.Identity.Name;
            string value;
            try
            {
                value = await _applicationUserRepository.ObtenerEmailPersonaPorIdUsuario(usuario);
            }
            catch (Exception pr)
            {
                value = null;
                _logger.LogError(pr.Message);
            }
            return value;
        }

       

        /// <summary>
        /// Servicio que obtiene una lista de Cargos.
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationRole>> ObtenerListaRoles()
        {
            var lista = new List<ApplicationRole>();
            try
            {
                lista = await _applicationUserRepository.ObtenerListaRoles();
            }
            catch (Exception p)
            {
                _logger.LogError(p.Message);
            }
            return lista;
        }

    }
}

