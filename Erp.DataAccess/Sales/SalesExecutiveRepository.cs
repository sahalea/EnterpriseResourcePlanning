using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Sales
{
    public class SalesExecutiveRepository : RepositoryBase<SalesExecutive>
    {
        public override IEnumerable<SalesExecutive> GetAll()
        {
            return _context.Set<SalesExecutive>()
                .AsEnumerable<SalesExecutive>();
        }

        public SalesExecutive GetById(int id)
        {
            return GetAll().Where(a => a.ExecutiveId == id).FirstOrDefault<SalesExecutive>();
        }
        public IEnumerable<SalesExecutive> GetFiltered(string query)
        {
            return _context.Set<SalesExecutive>()
                .Where(a => a.Name.Contains(query))
                .OrderBy(a => a.ExecutiveId);
        }
    }
}
