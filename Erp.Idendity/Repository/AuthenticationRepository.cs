using Erp.Identity.Infrastructure;
using Erp.Identity.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.Identity.Repository
{
    public class AuthenticationRepository : IDisposable
    {
        private AppIdentityDbContext _ctx;

        private UserManager<ApplicationUser, int> _userManager;

        public AuthenticationRepository()
        {
            _ctx = new AppIdentityDbContext();
            _userManager = new UserManager<ApplicationUser, int>(new UserStore<ApplicationUser, ApplicationRole, int, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>(_ctx));
        }

        public AspNetClients FindClient(string clientId)
        {
            var client = _ctx.AspNetClients.Find(clientId);

            return client;
        }
        public async Task<ApplicationUser> FindUser(string userName, string password)
        {
            ApplicationUser user = await _userManager.FindAsync(userName, password);

            return user;
        }
        public async Task<bool> AddRefreshToken(AspNetRefreshTokens token)
        {

            var existingToken = _ctx.AspNetRefreshTokens.Where(r => r.Subject == token.Subject && r.ClientId == token.ClientId).SingleOrDefault();

            if (existingToken != null)
            {
                var result = await RemoveRefreshToken(existingToken);
            }

            _ctx.AspNetRefreshTokens.Add(token);

            return await _ctx.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _ctx.AspNetRefreshTokens.FindAsync(refreshTokenId);

            if (refreshToken != null)
            {
                _ctx.AspNetRefreshTokens.Remove(refreshToken);
                return await _ctx.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshToken(AspNetRefreshTokens refreshToken)
        {
            _ctx.AspNetRefreshTokens.Remove(refreshToken);
            return await _ctx.SaveChangesAsync() > 0;
        }

        public async Task<AspNetRefreshTokens> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _ctx.AspNetRefreshTokens.FindAsync(refreshTokenId);

            return refreshToken;
        }

        public List<AspNetRefreshTokens> GetAllRefreshTokens()
        {
            return _ctx.AspNetRefreshTokens.ToList();
        }
        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
    }
}
