using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Auditoria
{
    [Table("AuditChanges")]
    public class Audit
    {
        [Key]

        public int Id { get; set; }
        
        public string TableName { get; set; }
       
        public DateTime DateTime { get; set; }
       
        public string KeyValues { get; set; }
       
        public string OldValues { get; set; }
       
        public string NewValues { get; set; }
        
        public string AppUser { get; set; }
    }
}
