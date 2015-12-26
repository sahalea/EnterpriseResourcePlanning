

namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Sales.DailyCustomerVisit")]
    public partial class DailyCustomerVisit
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerVisitId { get; set; }

        public int? CustomerId { get; set; }

        public DateTime? Date { get; set; }

        public int? CustomerContactId { get; set; }

        public bool IsNew { get; set; }

        public string Source { get; set; }

        public virtual Customers Customers { get; set; }

        public virtual CustomerContacts CustomerContacts { get; set; }

    }
}
