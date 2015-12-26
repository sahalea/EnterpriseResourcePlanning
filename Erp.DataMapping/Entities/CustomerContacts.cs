namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Sales.CustomerContacts")]
    public partial class CustomerContacts
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerContactId { get; set; }

        public int? CustomerId { get; set; }

        [StringLength(500)]
        public string Name { get; set; }

        [StringLength(500)]
        public string NameEx { get; set; }

        [StringLength(250)]
        public string Designation { get; set; }

        [StringLength(30)]
        public string Phone { get; set; }

        [StringLength(30)]
        public string Mobile { get; set; }

        [StringLength(300)]
        public string Email { get; set; }

        public string Remarks { get; set; }

        public virtual Customers Customers { get; set; }
    }
}
