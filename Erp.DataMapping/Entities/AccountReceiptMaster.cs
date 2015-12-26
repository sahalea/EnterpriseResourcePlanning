namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Accounts.AccountReceiptMaster")]
    public partial class AccountReceiptMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public AccountReceiptMaster()
        {
            AccountReceiptDetails = new HashSet<AccountReceiptDetails>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountReceiptMasterId { get; set; }
        public string AccountReceiptNumber { get; set; }
        public int? CustomerId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ReceiptNumber { get; set; }
        public int? PaymentMethodId { get; set; }
        public string ChequeNumber { get; set; }
        public DateTime ChequeDate { get; set; }
        public int? BankId { get; set; }
        public int? DebitAccountId { get; set; }
        public int? CreditAccountId { get; set; }
        public string TotalAmountInWords { get; set; }
        public decimal TotalAmount { get; set; }

        public virtual Customers Customers { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }
        public virtual AccountType AccountType { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AccountReceiptDetails> AccountReceiptDetails { get; set; }
        
    }
}
