using Erp.DataAccess.Core;
using Erp.DataAccess.Helper;
using Erp.DataMapping.Entities;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Erp.DataAccess.Transaction
{
    public class SalesOrderMasterRepository : RepositoryBase<SalesOrderMaster>
    {
        public override IEnumerable<SalesOrderMaster> GetAll()
        {
            return _context.Set<SalesOrderMaster>()
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
                .AsEnumerable<SalesOrderMaster>();
        }

        public SalesOrderMaster GetById(int id)
        {
            return _context.Set<SalesOrderMaster>()
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
                .Where(a => a.SalesOrderMasterId == id)
                .FirstOrDefault<SalesOrderMaster>();
        }

        public IEnumerable<SalesOrderMaster> GetFiltered(string query)
        {
            return _context.Set<SalesOrderMaster>()
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
               .Where(a => a.SalesOrderNumber.Contains(query)
                        || a.Customers.Name.Contains(query)
                        || a.SalesExecutive.Name.Contains(query))
               .OrderBy(a => a.SalesOrderMasterId)
               .Skip(0)
               .Take(25).ToList<SalesOrderMaster>();
        }

        public override void AddOrUpdate(SalesOrderMaster entity)
        {
            if (DbContextExtensions.IsTransient(_context, entity))
            {
                _context.Set<SalesOrderMaster>().Add(entity);
                _context.SaveChanges();
            }
            else
            {
                _context.Set<SalesOrderMaster>().Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
                _context.SaveChanges();
            }
        }


    }
}
