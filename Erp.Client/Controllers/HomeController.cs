using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Erp.Client.Helper;

namespace Erp.Client.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            ViewBag.User = HttpContext.User.Identity.Name;
            return View();
        }

        public String Scripts()
        {
            Response.ContentType = "application/javascript";
            //ViewBag.User = User.FullName();
            //ViewBag.Company = User.GetClaim("Company");
            //ViewBag.Division = User.GetClaim("Division");
            //ViewBag.Roles = User.GetClaim("Roles");


            StringBuilder buffer = new StringBuilder();
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                buffer.Append("var identity={}; identity.user = {}; identity.user.name = '" + HttpContext.User.Identity.Name + "';");
                buffer.Append("identity.user.fullName = '" + User.FullName() + "';");
                buffer.Append("identity.user.Id = '" + User.GetClaim("Id") + "';");

                String CompanyId = String.IsNullOrEmpty(User.GetClaim("CompanyId")) ? "0" : User.GetClaim("CompanyId");
                buffer.Append("identity.user.companyId = " + CompanyId + ";");

                buffer.Append("identity.user.loginTime = '" + User.GetClaim("LoginTime") + "';");
                buffer.Append("identity.user.roles = '" + User.GetClaim("Roles") + "';");
            }
            buffer.Append("var serviceEndPointBase = '" + Url.Content("~") + "';");
            //buffer.Append("var serviceEndPointBase = 'http://localhost/bluefishservices';");
            buffer.Append("var basePath = '" + Url.Content("~") + "';");
            buffer.Append("var serviceEndpointBase = '" + ConfigurationManager.AppSettings["ServiceBase"] + "';");
            buffer.Append("var serviceClientName = '" + ConfigurationManager.AppSettings["ServiceClientName"] + "';");
            buffer.Append("var serviceRootProperty = 'results';");
            return buffer.ToString();
        }
    }
}