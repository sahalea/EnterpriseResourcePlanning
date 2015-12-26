using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Sales
{
    public class CustomerRepository : RepositoryBase<Customers>
    {
        public override IEnumerable<Customers> GetAll()
        {
            return _context.Set<Customers>()
                .Include("Company")
                .Include("Country")
                .Include("CustomerDetails")
                .Include("CustomerDetails.AccountType")
                .AsEnumerable<Customers>();
        }

        public Customers GetById(int id)
        {
            return GetAll().Where(a => a.CustomerId == id).FirstOrDefault<Customers>();
        }

        public IEnumerable<Customers> GetFiltered(string query)
        {
            return _context.Set<Customers>()
               .Include("Company")
               .Include("Country")
               .Include("CustomerDetails")
               .Include("CustomerDetails.AccountType")
               .Where(a => a.CustomerCode.Contains(query) || a.Name.Contains(query))
               .OrderBy(a => a.CustomerId);
        }

    }
}
