namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Transactions.QuotationMaster")]
    public partial class QuotationMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public QuotationMaster()
        {
            QuotationDetails = new HashSet<QuotationDetails>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuotationMasterId { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string QuotationNumber { get; set; }
        public int? EnquiryMasterId  { get; set; }
        public int? CustomerId { get; set; }
        public int? CustomerContactId { get; set; }
        public int? ExecutiveId { get; set; }
        public int? ProjectId { get; set; }
        public DateTime QuotationDate { get; set; }
        public int? PaymentTermsId { get; set; }
        public int? DeliveryTermId { get; set; }
        [StringLength(50)]
        public string LeadTime { get; set; }
        public DateTime ValidThrough { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal Discount { get; set; }
        public string TotalAmountInWords { get; set; }
        public decimal Transportation { get; set; }
        public decimal Customs { get; set; }
        public string Remarks { get; set; }

        public virtual EnquiryMaster EnquiryMaster { get; set; }
        public virtual PaymentTerms PaymentTerms { get; set; }
        public virtual DeliveryTerms DeliveryTerms { get; set; }
        public virtual Customers Customers { get; set; }
        public virtual CustomerContacts CustomerContacts { get; set; }
        public virtual SalesExecutive SalesExecutive { get; set; }
        public virtual Projects Projects { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<QuotationDetails> QuotationDetails { get; set; }

    }
}
