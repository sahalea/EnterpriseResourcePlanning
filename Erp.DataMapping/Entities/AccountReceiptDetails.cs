namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Accounts.AccountReceiptDetails")]
    public partial class AccountReceiptDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountReceiptDetailId { get; set; }
        public int? AccountReceiptMasterId { get; set; }
        public string InvoiceNumber { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Description { get; set; }
        public decimal Discount { get; set; }
        public decimal AmountPaid { get; set; }
        public Boolean IsPaid { get; set; }

        public virtual AccountReceiptMaster AccountReceiptMaster { get; set; }

    }
}
