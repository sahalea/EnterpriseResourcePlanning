using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataMapping.Entities
{
    [Table("Common.Audit")]
    public partial class Audit
    {
        [Key]
        public int AuditId { get; set; }
        public DateTime? ActionDate { get; set; }
        public string Actor { get; set; }
        public string Action { get; set; }
        public string AuditTableSchema { get; set; }
        public string ActionTableName { get; set; }
        public string OldData { get; set; }
        public string UpdatedData { get; set; }
        public string Remarks { get; set; }
    }
}
