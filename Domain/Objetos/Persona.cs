using Domain.AspNet;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Objetos
{
    [Table("Persona")]
    public class Persona
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo Nombre es requerido")]
        [DisplayName("Nombre")]
        [StringLength(75)]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El campo Apellido paterno es requerido")]
        [DisplayName("Apellido paterno")]
        [StringLength(50)]
        public string ApellidoPaterno { get; set; }

        [Required(ErrorMessage = "El campo Apellido materno es requerido")]
        [DisplayName("Apellido materno")]
        [StringLength(50)]
        public string ApellidoMaterno { get; set; }
        [Required(ErrorMessage = "El campo Fecha de Nacimiento es requerido")]
        [DisplayName("Fecha de nacimiento")]
        public DateTime FechaNacimiento { get; set; }

        public DateTime FechaAlta { get; set; }
        public DateTime RowVersion { get; set; }
        public bool IsDeleted { get; set; }
        public string AppUser { get; set; }
        [ForeignKey("ApplicationUser")]
        public string IdApplicationUser { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

        [NotMapped]
        public int? Edad
        {
            get
            {
                if (this.FechaNacimiento != null)
                {
                    int edad = DateTime.Today.Year - this.FechaNacimiento.Year;
                    int edad1 = 0;
                    if (DateTime.Today < this.FechaNacimiento.AddYears(edad))
                    {
                        edad1 = --edad;
                    }
                    else
                    {
                        edad1 = edad;
                    }
                    return edad1;
                }
                return null;
            }
        }
    }
}
