﻿using Erp.Identity.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;


namespace Erp.Identity.Infrastructure
{
    public class ApplicationRoleStore : RoleStore<ApplicationRole, int, ApplicationUserRole>, IQueryableRoleStore<ApplicationRole, int>, IRoleStore<ApplicationRole, int>, IDisposable
    {
        public ApplicationRoleStore()
            : base(new AppIdentityDbContext())
        {
            base.DisposeContext = true;
        }

        public ApplicationRoleStore(DbContext context)
            : base(context)
        {
        }
    }
}
