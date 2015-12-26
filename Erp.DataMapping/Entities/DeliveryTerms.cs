namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Common.DeliveryTerms")]
    public partial class DeliveryTerms
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DeliveryTermId { get; set; }

        [StringLength(300)]
        public string Name { get; set; }

        [StringLength(300)]
        public string NameEx { get; set; }

        [StringLength(500)]
        public string Description { get; set; }
    }
}
