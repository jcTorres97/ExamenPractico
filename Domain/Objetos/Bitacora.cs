using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Objetos
{
    public class Bitacora
    {
        [Key]
        public int Id { get; set; }
        public string Accion { get; set; }
        public string Responsable { get; set; }
        public string Objeto { get; set; }
        public string NuevoValor { get; set; }
        public string AntiguoValor { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime RowVersion { get; set; }
        public bool IsDeleted { get; set; }
    }
}
