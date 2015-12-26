using Erp.Identity.Enums;
using Erp.Identity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Erp.Identity.Helper
{

    public class IdentityHelper
    {
        public static string GetHash(string input)
        {
            HashAlgorithm hashAlgorithm = new SHA256CryptoServiceProvider();

            byte[] byteValue = System.Text.Encoding.UTF8.GetBytes(input);

            byte[] byteHash = hashAlgorithm.ComputeHash(byteValue);

            return Convert.ToBase64String(byteHash);
        }

        public static void RegisterClient()
        {

            Identity.Infrastructure.AppIdentityDbContext ctx = new Infrastructure.AppIdentityDbContext();
            ctx.AspNetClients.Add(new AspNetClients
                {
                    Id = "AlFuzail",
                    Secret = IdentityHelper.GetHash("abc@123"),
                    Name = "Service End Point",
                    ApplicationType = ApplicationTypes.JavaScript,
                    Active = true,
                    RefreshTokenLifeTime = 7200,
                    AllowedOrigin = "*"
                });
            ctx.SaveChanges();
            ctx.Dispose();

        }
    }
}
