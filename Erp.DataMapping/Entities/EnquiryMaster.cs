namespace Erp.DataMapping.Entities
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Transactions.EnquiryMaster")]
    public partial class EnquiryMaster
    {

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EnquiryMaster()
        {
            EnquiryDetails = new HashSet<EnquiryDetails>();
        }

        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnquiryMasterId { get; set; }

        public int? CustomerId { get; set; }

        [StringLength(500)]
        public string EnquiryNumber { get; set; }
        
        public int? CustomerContactId { get; set; }
        
        public int? ExecutiveId { get; set; }

        public int? ProjectId { get; set; }

        [StringLength(250)]
        public string CustomerReference { get; set; }
        
        public DateTime Date { get; set; }

        public virtual Customers Customers { get; set; }
        public virtual CustomerContacts CustomerContacts { get; set; }
        public virtual SalesExecutive SalesExecutive { get; set; }
        public virtual Projects Projects { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EnquiryDetails> EnquiryDetails { get; set; }

    }
}
