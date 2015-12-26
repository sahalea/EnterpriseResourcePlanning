namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Sales.CustomerDetails")]
    public partial class CustomerDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerDetailId { get; set; }
        public int? CustomerId { get; set; }
        public int? PaymentTermsId { get; set; }
        public int? DeliveryTermsId { get; set; }
        public int? AccountTypeId { get; set; }
        [Column(TypeName = "numeric")]
        public decimal? OpeningBalance { get; set; }
        public DateTime? CreatedOn { get; set; }
        [StringLength(500)]
        public string Remarks { get; set; }

        public virtual Customers Customers { get; set; }
        public virtual AccountType AccountType { get; set; }
    }
}
