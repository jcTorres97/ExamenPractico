using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Objetos
{
    public class Inventario
    {
        [Key]
        public int Id { get; set; }
        public int Stock { get; set; }

        [ForeignKey("Sucursal")]
        public int IdSucursal{ get; set; }
        public virtual Sucursal Sucursal { get; set; }
        [ForeignKey("Producto")]
        public int IdProducto { get; set; }
        public virtual Producto Producto { get; set; }

        public DateTime FechaAlta { get; set; }
        public DateTime RowVersion { get; set; }
        public bool IsDeleted { get; set; }
    }
}
