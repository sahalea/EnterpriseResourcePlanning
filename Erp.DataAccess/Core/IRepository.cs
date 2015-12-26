using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Core
{
    public interface IRepository<T> : IDisposable where T : class
    {
    }
}
