using Erp.Identity.Infrastructure;
using Erp.Identity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using Erp.Client.Models;
using System.Threading.Tasks;
using Microsoft.Owin.Security;


namespace Erp.Client.Controllers
{
    public class AccountController : Controller
    {
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }   
        }
        public ApplicationUserManager UserManager
        {
            get
            {
                return HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
        }
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<JsonResult> Login(LoginViewModel model, string returnUrl)
        {
            Object responseObject = null;

            if (!ModelState.IsValid)
            {
                responseObject = new { success = false, message = "Invalid User Input" };
            }
            var result = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, isPersistent: false, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    responseObject = new { success = true };
                    break;
                case SignInStatus.LockedOut:
                    responseObject = new { success = false, message = "Account is locked out, please contact administrator" };
                    break;
                case SignInStatus.RequiresVerification:
                    var userId = await UserManager.FindByNameAsync(model.UserName);
                    var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId.Id);
                    var factorOptions = userFactors.Select(purpose => new { Text = purpose, Value = purpose }).ToList();

                    if (!await SignInManager.SendTwoFactorCodeAsync(factorOptions.FirstOrDefault().Value))
                    {
                        responseObject = new { success = false, message = "Error in sending verification code please try again." };
                    }
                    responseObject = new { success = true, tfaEnabled = true, provider = factorOptions.FirstOrDefault().Value, returnUrl = returnUrl };
                    break;
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid login attempt.");
                    responseObject = new { success = false, message = "Invalid login attempt." };
                    break;
            }

            return Json(responseObject);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<JsonResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    TwoFactorEnabled = model.EnableTwoFactor,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    PhoneNumber = model.PhoneNumber
                };
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    await UserManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

                    return Json(new ResponseModel { success = true });
                }
                else
                {
                    return Json(new { Message = "Error in registering", Errors = result.Errors, success = false });
                }
            }


            return Json(new { Message = "Invalid user values", Success = false, Errors = "" });
        }

        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(int userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "Index" : "Error");
        }

        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == 0)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<JsonResult> VerifyCode(VerifyCodeViewModel model)
        {
            object responseObject = null;

            if (!ModelState.IsValid)
            {
                responseObject = new { success = false, message = "Invalid input" };
            }
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    responseObject = new { success = true };
                    break;
                case SignInStatus.LockedOut:
                    responseObject = new { success = false, isLockedOut = true, message = "Account is locked out, please contact administrator." };
                    break;
                case SignInStatus.Failure:
                default:
                    responseObject = new { success = false, message = "Invalid Code, please enter again" };
                    break;
            }

            return Json(responseObject);
        }
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut();
            return RedirectToAction("Index", "Home");
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {

                return HttpContext.GetOwinContext().Authentication;
            }
        }

    }
}