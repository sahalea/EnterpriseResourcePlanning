using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Sales
{
    public class DailyCustomerVisitRepositiory : RepositoryBase<DailyCustomerVisit>
    {

        public override IEnumerable<DailyCustomerVisit> GetAll()
        {
            return _context.Set<DailyCustomerVisit>()
                .Include("Customers")
                .Include("CustomerContacts")
                .AsEnumerable<DailyCustomerVisit>();
        }

        public DailyCustomerVisit GetById(int id)
        {
            return GetAll().Where(a => a.CustomerVisitId == id).FirstOrDefault<DailyCustomerVisit>();
        }

        public IEnumerable<DailyCustomerVisit> GetFiltered(string query)
        {
            return _context.Set<DailyCustomerVisit>()
                .Include("Customers")
                .Include("CustomerContacts")
                .Where(a => a.Customers.Name.Contains(query)
                    || a.CustomerContacts.Name.Contains(query))
                .OrderBy(a => a.CustomerVisitId);
        }
    }
}
