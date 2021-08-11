using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Objetos
{
    [Table("Sucursal")]
    public class Sucursal
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo Nombre es requerido")]
        [DisplayName("Nombre")]
        [StringLength(75)]
        public string Name { get; set; }

        [Required(ErrorMessage = "El campo Direccion paterno es requerido")]
        [DisplayName("Direccion")]
        [StringLength(50)]
        public string Address { get; set; }

        [Required(ErrorMessage = "El campo Teléfono es requerido")]
        [DisplayName("Teléfono")]
        [StringLength(10)]
        public string PhoneNumber { get; set; }

        public DateTime FechaAlta { get; set; }
        public DateTime RowVersion { get; set; }
        public bool IsDeleted { get; set; }
    }
}
