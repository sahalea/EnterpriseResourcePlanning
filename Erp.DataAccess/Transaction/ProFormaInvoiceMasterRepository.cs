using Erp.DataAccess.Core;
using Erp.DataAccess.Helper;
using Erp.DataMapping.Entities;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;


namespace Erp.DataAccess.Transaction
{
    public class ProFormaInvoiceMasterRepository : RepositoryBase<ProFormaInvoiceMaster>
    {
        public override IEnumerable<ProFormaInvoiceMaster> GetAll()
        {
            return _context.Set<ProFormaInvoiceMaster>()
                .Include("Customers")
                .Include("CustomerContacts")
                .Include("QuotationMaster")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("PaymentTerms")
                .Include("DeliveryTerms")
                .Include("SalesOrderDetails")
                .Include("Material")
                .Include("Product")
                .Include("ItemSize")
                .Include("Make")
                .Include("Grade")
                .Include("Units")
                .AsEnumerable<ProFormaInvoiceMaster>();
        }

        public ProFormaInvoiceMaster GetById(int id)
        {
            return _context.Set<ProFormaInvoiceMaster>()
                .Include("Customers")
                .Include("CustomerContacts")
                .Include("QuotationMaster")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("PaymentTerms")
                .Include("DeliveryTerms")
                .Include("SalesOrderDetails")
                .Include("Material")
                .Include("Product")
                .Include("ItemSize")
                .Include("Make")
                .Include("Grade")
                .Include("Units")
                .Where(a => a.ProInvoiceMasterId == id)
                .FirstOrDefault<ProFormaInvoiceMaster>();
        }

        public IEnumerable<ProFormaInvoiceMaster> GetFiltered(string query)
        {
            return _context.Set<ProFormaInvoiceMaster>()
               .Include("Customers")
                .Include("CustomerContacts")
                .Include("QuotationMaster")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("PaymentTerms")
                .Include("DeliveryTerms")
                .Include("SalesOrderDetails")
                .Include("SalesOrderDetails.Material")
                .Include("SalesOrderDetails.Product")
                .Include("SalesOrderDetails.ItemSize")
                .Include("SalesOrderDetails.Make")
                .Include("SalesOrderDetails.Grade")
                .Include("SalesOrderDetails.Units")
               .Where(a => a.ProInvoiceNumber.Contains(query)
                        || a.Customers.Name.Contains(query)
                        || a.SalesExecutive.Name.Contains(query))
               .OrderBy(a => a.ProInvoiceMasterId);
        }

    }
}
