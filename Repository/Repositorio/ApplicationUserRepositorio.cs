using Domain.AspNet;
using Domain.Objetos;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositorio
{
    public class ApplicationUserRepositorio
    {
        private readonly ApplicationDbContext _context;

        public ApplicationUserRepositorio(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Consulta que elimina un usuario a través de su Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<int> Eliminar(string id)
        {
            var applicationUser = await _context.ApplicationUsers.FindAsync(id);
            _context.ApplicationUsers.Remove(applicationUser);
            return await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Consulta para editar un usuario. Recibe un onjeto de tipo ApplicationUser.
        /// </summary>
        /// <param name="applicationUser"></param>
        /// <returns></returns>
        public async Task<int> Editar(ApplicationUser applicationUser)
        {
            _context.Update(applicationUser);
            return await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Consulta que valida sí ya existe un nombre igual en la tabla de base de datos. 
        /// </summary>
        /// <param name="username"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> ValidarPorNombreUsuario(string username, string id)
        {
            ApplicationUser user = null;

            if (id == "")
            {
                user = await _context.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();
            }
            else
            {
                user = await _context.Users.Where(x => x.UserName == username && x.Id != id).FirstOrDefaultAsync();
            }
            if (user != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Consulta que valida sí el Email ya se encuentra registrado.
        /// </summary>
        /// <param name="email"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> ValidarPorEmail(string email, string id)
        {
            ApplicationUser user = null;
            if (id == "")
            {
                user = await _context.Users.Where(x => x.Email == email).FirstOrDefaultAsync();
            }
            else
            {
                user = await _context.Users.Where(x => x.Email == email && x.Id != id).FirstOrDefaultAsync();
            }
            if (user != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Consulta que retorna una lista de usuarios.
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationUser>> ObtenerLista()
        {
            return await _context.ApplicationUsers.ToListAsync();
        }

        /// <summary>
        /// Consulta que retorna una lista de todos los usuarios incluyendo los eliminados.
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationUser>> ObtenerListaEliminados()
        {
            return await _context.ApplicationUsers.IgnoreQueryFilters().ToListAsync();
        }

        /// <summary>
        /// Consulta que valida sí el email ya esta registrado entre los usuarios que están eliminados.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> ValidarExistenteEliminadoPorEmail(string email)
        {
            return await _context.ApplicationUsers.IgnoreQueryFilters().Include(x => x.Persona).Where(x => x.Email == email).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Consulta que valida sí user name ya esta registrado entre los usuarios eliminados.
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> ValidarExistenteEliminadoPorUsername(string username)
        {
            return await _context.ApplicationUsers.IgnoreQueryFilters().Include(x => x.Persona).Where(x => x.UserName == username).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Consulta que crea un nuevo usuario.
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public async Task<int> Crear(ApplicationUser usuario)
        {
            await _context.ApplicationUsers.AddAsync(usuario);
            return await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Consulta que busca un usuario a través de su Id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> BuscarPorId(string id)
        {
            return await _context.ApplicationUsers.Include(x => x.Persona).FirstOrDefaultAsync(u => u.Id == id);
        }
        /// <summary>
        /// Query que busca a una persona por medio del correo
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<Persona> obtenerPersonaPorEmail(string email)
        {

            return await _context.Personas.Include(x => x.ApplicationUser).FirstOrDefaultAsync(x => x.ApplicationUser.Email.ToLower() == email.ToLower());
            //await _context.ApplicationUsers.FirstOrDefaultAsync(p => p.Email.ToLower() == email.ToLower());
        }
        public async Task<Persona> obtenerPersonaPorId(int? id)
        {

            return await _context.Personas.Include(x => x.ApplicationUser).FirstOrDefaultAsync(x => x.Id == id);
        }
        
        /// <summary>
        /// Retorna un id persona mediante el id del usuario.
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public async Task<int?> ObtenerIdPersonaPorIdUsuario(string usuario)
        {
            return await _context.ApplicationUsers.Where(u => u.UserName == usuario).Select(x => x.Persona.Id).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Recupera al usuario a través del id de la persona.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> ObtenerUsuarioPorIdPersona(int? id)
        {
            return await _context.ApplicationUsers.Include(p => p.Persona).FirstOrDefaultAsync(p => p.Persona.Id == id);
        }
        /// <summary>
        /// Query para obtener a un aplication user por medio del id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ApplicationUser> ObtenerUsuario(string id)
        {
            return await _context.ApplicationUsers.Include(x => x.Persona).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<ApplicationUser> ObtenerUsuarioPorEmail(string email)
        {
            return await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
        }

        /// <summary>
        /// Retorna el email de una persona mediante el UserName del usuario.
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        public async Task<string> ObtenerEmailPersonaPorIdUsuario(string usuario)
        {
            return await _context.ApplicationUsers.Where(u => u.UserName == usuario).Select(x => x.Email).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Consulta que retorna una lista de todos los usuarios incluyendo los eliminados.
        /// </summary>
        /// <returns></returns>
        public async Task<List<ApplicationRole>> ObtenerListaRoles()
        {
            return await _context.ApplicationRoles.IgnoreQueryFilters().ToListAsync();
        }
    }
}
