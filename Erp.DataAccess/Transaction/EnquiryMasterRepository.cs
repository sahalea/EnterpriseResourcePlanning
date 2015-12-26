using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Transaction
{
    public class EnquiryMasterRepository : RepositoryBase<EnquiryMaster>
    {
        public override IEnumerable<EnquiryMaster> GetAll()
        {
            return _context.Set<EnquiryMaster>()
               .Include("Customers")
               .Include("CustomerContacts")
               .Include("SalesExecutive")
               .Include("Projects")
               .Include("EnquiryDetails")
               .Include("EnquiryDetails.Material")
               .Include("EnquiryDetails.Product")
               .Include("EnquiryDetails.ItemSize")
               .Include("EnquiryDetails.Make")
               .Include("EnquiryDetails.Grade")
               .Include("EnquiryDetails.Units");
        }
        public EnquiryMaster GetById(int id)
        {
            return _context.Set<EnquiryMaster>()
               .Include("Customers")
               .Include("CustomerContacts")
               .Include("SalesExecutive")
               .Include("Projects")
               .Include("EnquiryDetails")
               .Include("EnquiryDetails.Material")
               .Include("EnquiryDetails.Product")
               .Include("EnquiryDetails.ItemSize")
               .Include("EnquiryDetails.Make")
               .Include("EnquiryDetails.Grade")
               .Include("EnquiryDetails.Units")
               .Where(a => a.EnquiryMasterId == id)
               .FirstOrDefault<EnquiryMaster>();
        }

        public IEnumerable<EnquiryMaster> GetFiltered(string query)
        {
            return _context.Set<EnquiryMaster>()
                .Include("Customers")
               .Include("CustomerContacts")
               .Include("SalesExecutive")
               .Include("Projects")
               .Include("EnquiryDetails")
               .Include("EnquiryDetails.Material")
               .Include("EnquiryDetails.Product")
               .Include("EnquiryDetails.ItemSize")
               .Include("EnquiryDetails.Make")
               .Include("EnquiryDetails.Grade")
               .Include("EnquiryDetails.Units")
               .Where(a => a.EnquiryNumber.Contains(query)
               || a.Customers.Name.Contains(query)
               || a.CustomerContacts.Name.Contains(query)
               || a.SalesExecutive.Name.Contains(query))
               .OrderBy(a => a.EnquiryMasterId);
        }
    }
}
