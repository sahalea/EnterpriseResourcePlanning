using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Erp.DataAccess.Accounts
{
    public class AccountReceiptRepository : RepositoryBase<AccountReceiptMaster>
    {
        public override IEnumerable<AccountReceiptMaster> GetAll()
        {
            return _context.Set<AccountReceiptMaster>()
                .Include("Customers")
                .Include("AccountType")
                .Include("AccountReceiptDetails")
                .AsEnumerable<AccountReceiptMaster>();
        }

        public IEnumerable<AccountReceiptMaster> GetFiltered(string query)
        {
            return _context.Set<AccountReceiptMaster>()
                .Include("Customers")
                .Include("AccountType")
                .Include("AccountReceiptsDetails")
                .Where(a => a.Customers.Name.Contains(query))
                .OrderBy(a => a.AccountReceiptMasterId);
        }

    }
}
