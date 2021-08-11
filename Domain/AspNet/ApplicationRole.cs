using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.AspNet
{
    public class ApplicationRole : IdentityRole
    {
        public DateTime RowVersion { get; set; }
        public string AppUser { get; set; }
        public bool IsDeleted { get; set; }
    }
}
