namespace Erp.DataMapping.Entities
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Data.Entity.ModelConfiguration.Conventions;

    public partial class ErpModel : DbContext
    {
        public ErpModel()
            : base("name=ErpModel")
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
            Database.SetInitializer<ErpModel>(null);
        }

        public virtual DbSet<Company> Company { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<DeliveryTerms> DeliveryTerms { get; set; }
        public virtual DbSet<PaymentTerms> PaymentTerms { get; set; }
        public virtual DbSet<Units> Units { get; set; }
        public virtual DbSet<CustomerContacts> CustomerContacts { get; set; }
        public virtual DbSet<CustomerDetails> CustomerDetails { get; set; }
        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<DailyCustomerVisit> DailyCustomerVisit { get; set; }
        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<SalesExecutive> SalesEcecutive { get; set; }
        public virtual DbSet<EnquiryMaster> EnquiryMaster { get; set; }
        public virtual DbSet<EnquiryDetails> EnquiryDetails { get; set; }
        public virtual DbSet<Material> Material { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ItemSize> ItemSize { get; set; }
        public virtual DbSet<Make> Make { get; set; }
        public virtual DbSet<Grade> Grade { get; set; }
        public virtual DbSet<QuotationMaster> QuotationMaster { get; set; }
        public virtual DbSet<QuotationDetails> QuotationDetails { get; set; }
        public virtual DbSet<SalesOrderMaster> SalesOrderMaster { get; set; }
        public virtual DbSet<SalesOrderDetails> SalesOrderDetails { get; set; }
        public virtual DbSet<DeliveryNoteMaster> DeliveryNoteMaster { get; set; }
        public virtual DbSet<DeliveryNoteDetails> DeliveryNoteDetails { get; set; }
        public virtual DbSet<InvoiceMaster> InvoiceMaster { get; set; }
        public virtual DbSet<InvoiceDetails> InvoiceDetails { get; set; }
        public virtual DbSet<AccountType> AccountType { get; set; }
        public virtual DbSet<ChartsOfAccount> ChartsOfAccount { get; set; }
        public virtual DbSet<PaymentMethod> PaymentMethod { get; set; }
        public virtual DbSet<ProFormaInvoiceMaster> ProFormaInvoiceMaster { get; set; }
        public virtual DbSet<ProFormaInvoiceDetails> ProFormaInvoiceDetails { get; set; }
        public virtual DbSet<AccountReceiptMaster> AccountReceiptMaster { get; set; }
        public virtual DbSet<AccountReceiptDetails> AccountReceiptDetails { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>()
                .Property(e => e.PostBox)
                .IsUnicode(false);

            modelBuilder.Entity<Units>()
                .Property(e => e.UnitCode)
                .IsUnicode(false);

            modelBuilder.Entity<Customers>()
                .Property(e => e.CustomerCode)
                .IsUnicode(false);
        }
    }
}
