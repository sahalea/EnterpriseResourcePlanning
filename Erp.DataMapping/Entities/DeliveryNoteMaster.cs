namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Transactions.DeliveryNoteMaster")]
    public partial class DeliveryNoteMaster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DeliveryNoteMaster()
        {
            DeliveryNoteDetails = new HashSet<DeliveryNoteDetails>();
        }

        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DeliveryNoteMasterId { get; set; }
        public int? SalesOrderMasterId { get; set; }
        public string DeliveryNoteNumber { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? CustomerId { get; set; }
        public int? CustomerContactId { get; set; }
        public int? ProjectId { get; set; }
        public int? ExecutiveId { get; set; }

        public virtual SalesOrderMaster SalesOrderMaster { get; set; }
        public virtual Customers Customers { get; set; }
        public virtual CustomerContacts CustomerContacts { get; set; }
        public virtual Projects Projects { get; set; }
        public virtual SalesExecutive SalesExecutive { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DeliveryNoteDetails> DeliveryNoteDetails { get; set; }

    }
}
