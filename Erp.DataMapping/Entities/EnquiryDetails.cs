namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Transactions.EnquiryDetails")]
    public partial class EnquiryDetails
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EnquiryDetailId { get; set; }
        public int? EnquiryMasterId { get; set; }
        public int? MaterialId { get; set; }
        public int? ProductId { get; set; }
        public int? ItemSizeId { get; set; }
        public int? MakeId { get; set; }
        public int? GradeId { get; set; }
        public int Quantity { get; set; }
        public int UnitId { get; set; }

        public virtual EnquiryMaster EnquiryMaster { get; set; }
        public virtual Material Material { get; set; }
        public virtual Product Product { get; set; }
        public virtual ItemSize ItemSize { get; set; }
        public virtual Make Make { get; set; }
        public virtual Grade Grade { get; set; }
        public virtual Units Units { get; set; }
    }
}
