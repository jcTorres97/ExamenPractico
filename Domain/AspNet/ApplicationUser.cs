using Domain.Objetos;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using static Common.Enumeraciones;

namespace Domain.AspNet
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime RowVersion { get; set; }
        public string AppUser { get; set; }
        public Persona Persona { get; set; }
        public bool IsDeleted { get; set; }
        public EstatusUsuario EstatusUsuario { get; set; }
    }
}
