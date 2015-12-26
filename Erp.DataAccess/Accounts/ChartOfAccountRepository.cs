using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Accounts
{
    public class ChartOfAccountRepository : RepositoryBase<ChartsOfAccount>
    {
        public override IEnumerable<ChartsOfAccount> GetAll()
        {
            return _context.Set<ChartsOfAccount>()
                .Include("AccountType");
        }

        public ChartsOfAccount GetById(int id)
        {
            return _context.Set<ChartsOfAccount>()
                .Include("AccountType")
                .Where(a => a.ChartsAccountId == id)
                .FirstOrDefault<ChartsOfAccount>();
        }

        public IEnumerable<ChartsOfAccount> GetFiltered(string query)
        {
            return _context.Set<ChartsOfAccount>()
                .Include("AccountType")
                .Where(a => a.AccountType.Name.Contains(query)
                || a.Description.Contains(query))
                .OrderBy(a => a.ChartsAccountId);
        }
    }
}
