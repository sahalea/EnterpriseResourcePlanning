namespace Erp.DataMapping.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Transactions.DeliveryNoteDetails")]
    public partial class DeliveryNoteDetails
    {
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DeliveryNoteDetailId { get; set; }
        public int? DeliveryNoteMasterId { get; set; }
        public int? MaterialId { get; set; }
        public int? ProductId { get; set; }
        public int? ItemSizeId { get; set; }
        public int? MakeId { get; set; }
        public int? GradeId { get; set; }
        public int Quantity { get; set; }
        public int UnitId { get; set; }
        public int TotalDelivery { get; set; }
        public int BalanceDelivery { get; set; }
        public int CurrentDelivery { get; set; }

        public virtual DeliveryNoteMaster DeliveryNoteMaster { get; set; }
        public virtual Material Material { get; set; }
        public virtual Product Product { get; set; }
        public virtual ItemSize ItemSize { get; set; }
        public virtual Make Make { get; set; }
        public virtual Grade Grade { get; set; }
        public virtual Units Units { get; set; }

    }
}
