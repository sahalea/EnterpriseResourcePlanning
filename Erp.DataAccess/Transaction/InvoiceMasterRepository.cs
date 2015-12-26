using Erp.DataAccess.Core;
using Erp.DataAccess.Helper;
using Erp.DataMapping.Entities;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;


namespace Erp.DataAccess.Transaction
{
    public class InvoiceMasterRepository : RepositoryBase<InvoiceMaster>
    {
        public override IEnumerable<InvoiceMaster> GetAll()
        {
            return _context.Set<InvoiceMaster>()
                .Include("DeliveryNoteMaster")
                .Include("Customers")
                .Include("CustomerContacts")
                .Include("DeliveryNoteMaster.SalesOrderMaster.DeliveryTerms")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("DeliveryNoteMaster.SalesOrderMaster.PaymentTerms")
                .Include("InvoiceDetails")
                .Include("InvoiceDetails.Material")
                .Include("InvoiceDetails.Product")
                .Include("InvoiceDetails.ItemSize")
                .Include("InvoiceDetails.Make")
                .Include("InvoiceDetails.Grade")
                .Include("InvoiceDetails.Units")
                .AsEnumerable<InvoiceMaster>();
        }

        public InvoiceMaster GetById(int id)
        {
            return _context.Set<InvoiceMaster>()
                .Include("DeliveryNoteMaster")
                .Include("Customers")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("PaymentTerms")
                .Include("InvoiceDetails")
                .Include("InvoiceDetails.Material")
                .Include("InvoiceDetails.Product")
                .Include("InvoiceDetails.ItemSize")
                .Include("InvoiceDetails.Make")
                .Include("InvoiceDetails.Grade")
                .Include("InvoiceDetails.Units")
                .Where(a => a.InvoiceMasterId == id)
                .FirstOrDefault<InvoiceMaster>();
        }

        public IEnumerable<InvoiceMaster> GetFiltered(string query)
        {
            return _context.Set<InvoiceMaster>()
                .Include("DeliveryNoteMaster")
                .Include("Customers")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("DeliveryNoteMaster.SalesOrderMaster.PaymentTerms")
                .Include("DeliveryNoteMaster.SalesOrderMaster.DeliveryTerms")
                .Include("InvoiceDetails")
                .Include("InvoiceDetails.Material")
                .Include("InvoiceDetails.Product")
                .Include("InvoiceDetails.ItemSize")
                .Include("InvoiceDetails.Make")
                .Include("InvoiceDetails.Grade")
                .Include("InvoiceDetails.Units")
               .Where(a => a.InvoiceNumber.Contains(query))
               .OrderBy(a => a.InvoiceMasterId)
               .Skip(0)
               .Take(25).ToList<InvoiceMaster>();
        }
        public IEnumerable<InvoiceMaster> GetInvoiceByCustomerId(int id)
        {
            return _context.Set<InvoiceMaster>()
                .Include("DeliveryNoteMaster")
                .Include("Customers")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("DeliveryNoteMaster.SalesOrderMaster.PaymentTerms")
                .Include("DeliveryNoteMaster.SalesOrderMaster.DeliveryTerms")
                .Include("InvoiceDetails")
                .Include("InvoiceDetails.Material")
                .Include("InvoiceDetails.Product")
                .Include("InvoiceDetails.ItemSize")
                .Include("InvoiceDetails.Make")
                .Include("InvoiceDetails.Grade")
                .Include("InvoiceDetails.Units")
               .Where(a => a.CustomerId == id)
               .OrderBy(a => a.InvoiceMasterId)
               .ToList<InvoiceMaster>();
        }

    }
}
