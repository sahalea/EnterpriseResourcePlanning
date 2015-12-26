using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Common
{
   public class ProjectRepository : RepositoryBase<Projects>
    {
        public override IEnumerable<Projects> GetAll()
        {
            return _context.Set<Projects>()
                .AsEnumerable<Projects>();
        }

        public Projects GetById(int id)
        {
            return GetAll().Where(a => a.ProjectId == id).FirstOrDefault<Projects>();
        }
        public IEnumerable<Projects> GetFiltered(string query)
        {
            return _context.Set<Projects>()
                .Where(a => a.Name.Contains(query))
                .OrderBy(a => a.ProjectId);
        }
    }
}
