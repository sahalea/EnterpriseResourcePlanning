namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Transactions.InvoiceDetails")]
    public partial class InvoiceDetails
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InvoiceDetailId { get; set; }
        public int InvoiceMasterId { get; set; }
        public int MaterialId { get; set; }
        public int ProductId { get; set; }
        public int ItemSizeId { get; set; }
        public int MakeId { get; set; }
        public int GradeId { get; set; }
        public int UnitId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitRate { get; set; }
        public decimal Discount { get; set; }
        public decimal Amont { get; set; }

        public virtual Make Make { get; set; }
        public virtual Grade Grade { get; set; }
        public virtual Units Units { get; set; }
        public virtual Product Product { get; set; }
        public virtual Material Material { get; set; }
        public virtual ItemSize ItemSize { get; set; }
        public virtual InvoiceMaster InvoiceMaster { get; set; }
       
    }
}
