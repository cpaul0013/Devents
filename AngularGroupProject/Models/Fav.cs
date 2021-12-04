using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AngularGroupProject.Models
{
    public class Fav
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("Event")]
        public int EventId { get; set; }

        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }

    }
}
