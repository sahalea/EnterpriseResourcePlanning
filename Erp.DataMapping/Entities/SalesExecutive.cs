namespace Erp.DataMapping.Entities
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Sales.SalesExecutive")]
    public partial class SalesExecutive
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ExecutiveId { get; set; }
        
        public int EmployeeId { get; set; }
        
        public string Name { get; set; }
        
        public int MonthlyTarget { get; set; }
    }
}
