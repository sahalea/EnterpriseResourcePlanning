using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataMapping.Entities
{
    [Table("Common.Projects")]
    public partial class Projects
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string MainContractor { get; set; }
        public string Consultant { get; set; }
        public string Owner { get; set; }
    }
}
