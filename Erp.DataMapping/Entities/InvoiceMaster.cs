namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Transactions.InvoiceMaster")]
    public partial class InvoiceMaster
    {

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public InvoiceMaster()
        {
            InvoiceDetails = new HashSet<InvoiceDetails>();
        }
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InvoiceMasterId { get; set; }
        public string InvoiceNumber { get; set; }
        public int DeliveryNoteMasterId { get; set; }
        public int? CustomerId { get; set; }
        public int? CustomerContactId { get; set; }
        public int? ProjectId { get; set; }
        public int? ExecutiveId { get; set; }
        public int? DeliveryTermId { get; set; }
        public int? PaymentTermsId { get; set; }
        public DateTime CreatedOn { get; set; }
        public decimal Transportation { get; set; }
        public decimal Customs { get; set; }
        public decimal TotalAmount { get; set; }
        public string TotalAmountInWords { get; set; }
        public int AccountTypeId { get; set; }

        public virtual DeliveryNoteMaster DeliveryNoteMaster { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<InvoiceDetails> InvoiceDetails { get; set; }
        public virtual Customers Customers { get; set; }
        public virtual CustomerContacts CustomerContacts { get; set; }
        public virtual Projects Projects { get; set; }
        public virtual SalesExecutive SalesExecutive { get; set; }
        public virtual AccountType AccountType { get; set; }
        public virtual DeliveryTerms DeliveryTerms { get; set; }
        public virtual PaymentTerms PaymentTerms { get; set; }

    }
}
