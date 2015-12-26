

using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(Erp.Client.Startup))]
namespace Erp.Client
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Configure the db context, user manager and role manager to use a single instance per request
            ConfigureAuth(app);
        }
    }
}