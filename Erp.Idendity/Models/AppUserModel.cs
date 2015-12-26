using Erp.Identity.Enums;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Erp.Identity.Models
{
    public class AppUser : IdentityUser
    {
        // additional properties will go here
        public Task<System.Security.Claims.ClaimsIdentity> GenerateUserIdentityAsync(Infrastructure.AppUserManager manager)
        {
            throw new NotImplementedException();
        }
    }

    public class ApplicationUser : IdentityUser<int, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>, IUser<int>
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser, int> manager)
        {
            var userIdentity = await manager
                .CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);

            userIdentity.AddClaim(new Claim("Name", FirstName + " " + LastName));
            userIdentity.AddClaim(new Claim("Company", CompanyId.ToString()));
            userIdentity.AddClaim(new Claim("LoginTime", DateTime.Now.ToString("dd/MM/YY hh:mm:ss")));

            List<String> roles = manager.GetRoles<ApplicationUser, int>(this.Id)
                    .ToList<String>()
                    .Select(x => x.ToUpper().Replace(' ', '_'))
                    .ToList<String>();
            userIdentity.AddClaim(new Claim("Roles", String.Join(";", roles.ToArray())));



            return userIdentity;
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int GenderId { get; set; }
        public int CompanyId { get; set; }
    }
    public class ApplicationRole : IdentityRole<int, ApplicationUserRole>, IRole<int>
    {
        public string Description { get; set; }

        public ApplicationRole() : base() { }
        public ApplicationRole(string name)
            : this()
        {
            this.Name = name;
        }

        public ApplicationRole(string name, string description)
            : this(name)
        {
            this.Description = description;
        }
    }
    public class ApplicationUserRole : IdentityUserRole<int> { }
    
    public class ApplicationUserLogin : IdentityUserLogin<int>
    {
    }
    public class ApplicationUserClaim : IdentityUserClaim<int> { }

    public class AspNetClients
    {
        [Key]
        public string Id { get; set; }
        [Required]
        public string Secret { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public ApplicationTypes ApplicationType { get; set; }
        public bool Active { get; set; }
        public int RefreshTokenLifeTime { get; set; }
        [MaxLength(100)]
        public string AllowedOrigin { get; set; }
    }
    public class AspNetRefreshTokens
    {
        [Key]
        public string Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Subject { get; set; }
        [Required]
        [MaxLength(50)]
        public string ClientId { get; set; }
        public DateTime IssuedUtc { get; set; }
        public DateTime ExpiresUtc { get; set; }
        [Required]
        public string ProtectedTicket { get; set; }
    }
}
