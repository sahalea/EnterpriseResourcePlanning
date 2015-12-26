using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Sales
{
    public class CustomerContactRepository : RepositoryBase<CustomerContacts>
    {

        public override IEnumerable<CustomerContacts> GetAll()
        {
            return _context.Set<CustomerContacts>()
                .Include("Customers")
                .AsEnumerable<CustomerContacts>();
        }

        public CustomerContacts GetById(int id)
        {
            return GetAll().Where(a => a.CustomerContactId == id).FirstOrDefault<CustomerContacts>();
        }
        public IEnumerable<CustomerContacts> GetFiltered(string query)
        {
            return _context.Set<CustomerContacts>()
                .Include("Customers")
                .Where(a => a.Customers.Name.Contains(query) || a.Name.Contains(query))
                .OrderBy(a => a.CustomerContactId);
        }
    }
}
