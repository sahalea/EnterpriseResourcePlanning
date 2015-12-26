using Erp.DataAccess.Core;
using Erp.DataAccess.Helper;
using Erp.DataMapping.Entities;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Erp.DataAccess.Transaction
{
    public class QuotationMasterRepository : RepositoryBase<QuotationMaster>
    {
        public override IEnumerable<QuotationMaster> GetAll()
        {
            return _context.Set<QuotationMaster>()
                .Include("EnquiryMaster")
                .Include("PaymentTerms")
                .Include("DeliveryTerms")
                .Include("QuotationDetails")
                .Include("Customers")
                .Include("CustomerContacts")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("QuotationDetails.Material")
                .Include("QuotationDetails.Product")
                .Include("QuotationDetails.ItemSize")
                .Include("QuotationDetails.Make")
                .Include("QuotationDetails.Grade")
                .Include("QuotationDetails.Units")
                .AsEnumerable<QuotationMaster>();
        }

        public QuotationMaster GetById(int id)
        {
            return _context.Set<QuotationMaster>()
                .Include("EnquiryMaster")
                .Include("PaymentTerms")
                .Include("DeliveryTerms")
                .Include("QuotationDetails")
                .Include("QuotationDetails.Material")
                .Include("QuotationDetails.Product")
                .Include("QuotationDetails.ItemSize")
                .Include("QuotationDetails.Make")
                .Include("QuotationDetails.Grade")
                .Include("QuotationDetails.Units")
                .Include("EnquiryMaster.Customers")
                .Include("CustomerContacts")
                .Include("SalesExecutive")
                .Include("Projects")
                .Include("EnquiryDetails")
                .Where(a => a.QuotationMasterId == id)
                .FirstOrDefault<QuotationMaster>();
        }

        public IEnumerable<QuotationMaster> GetFiltered(string query)
        {
            return _context.Set<QuotationMaster>()
               .Include("EnquiryMaster")
                .Include("PaymentTerms")
                .Include("DeliveryTerms")
                .Include("Customers")
                .Include("QuotationDetails")
                .Include("QuotationDetails.Material")
                .Include("QuotationDetails.Product")
                .Include("QuotationDetails.ItemSize")
                .Include("QuotationDetails.Make")
                .Include("QuotationDetails.Grade")
                .Include("QuotationDetails.Units")
                .Include("Customers")
                .Include("CustomerContacts")
                .Include("SalesExecutive")
                .Include("Projects")
               .Where(a => a.QuotationNumber.Contains(query)
               || a.EnquiryMaster.EnquiryNumber.Contains(query)
               || a.EnquiryMaster.Customers.Name.Contains(query)
               || a.EnquiryMaster.SalesExecutive.Name.Contains(query))
               .OrderBy(a => a.QuotationMasterId);
        }

        public override void AddOrUpdate(QuotationMaster entity)
        {
            if (DbContextExtensions.IsTransient(_context, entity))
            {
                _context.Set<QuotationMaster>().Add(entity);
                _context.SaveChanges();
            }
            else
            {
                    _context.Set<QuotationMaster>().Attach(entity);
                    _context.Entry(entity).State = EntityState.Detached;
                    _context.SaveChanges();
                
            }
           
        }
    }
}
