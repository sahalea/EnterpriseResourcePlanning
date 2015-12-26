using Erp.Identity.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.Identity.Infrastructure
{
    public class ApplicationUserStore : UserStore<ApplicationUser, ApplicationRole, int,
     ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>, Microsoft.AspNet.Identity.IUserStore<ApplicationUser, int>, IDisposable
    {
        public ApplicationUserStore()
            : this(new AppIdentityDbContext())
        {
            base.DisposeContext = true;
        }

        public ApplicationUserStore(DbContext context)
            : base(context)
        {
        }
    }
}
