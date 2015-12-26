namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Accounts.ChartsOfAccount")]
    public partial class ChartsOfAccount
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChartsAccountId { get; set; }

        [StringLength(50)]
        public string AccountId { get; set; }
        public string Description { get; set; }
        public int? AccountTypeId { get; set; }
        
        public virtual AccountType AccountType { get; set; }

    }
}
