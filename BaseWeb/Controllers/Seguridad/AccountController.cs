using BaseWeb.Extensiones;
using Domain.AspNet;
using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Common.Enumeraciones;

namespace BaseWeb.Controllers.Seguridad
{
    [AllowAnonymous]
    [Layout("_AuthLayout")]
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<AccountController> _logger;
        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, ILogger<AccountController> logger)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
        }

       
        /// <summary>
        /// Metodo GET que retorna una vista
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(string returnUrl = null)
        {
            return View();
        }


        /// <summary>
        /// Metodo POST para ingresar al sistema
        /// </summary>
        /// <param name="model"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
           

            ViewData["ReturnUrl"] = returnUrl;

            if (ModelState.IsValid)
            {
                
                // To enable pas
                ApplicationUser us;

                us = await _userManager.FindByEmailAsync(model.Email);
                if (us != null)
                {
                    if (us.IsDeleted == false && us.EstatusUsuario == EstatusUsuario.ACTIVO)
                    {
                        if (await _userManager.IsEmailConfirmedAsync(us))
                        {
                            var result = await _signInManager.PasswordSignInAsync(us.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                            if (result.Succeeded)
                            {
                                _logger.LogInformation("User logged in.");
                                return RedirectToLocal(returnUrl);
                            }
                            else
                            {

                                TempData["WarningLogin"] = "Error al iniciar sesión. Verificar el correo y contraseña.";
                            }
                            if (result.IsLockedOut)
                            {

                                _logger.LogWarning("User account locked out.");
                                return RedirectToAction(nameof(Lockout));
                            }

                            TempData["WarningLogin"] = "Error al iniciar sesión. Verificar el correo y contraseña.";
                            return View(model);
                        }
                        else
                        {
                            TempData["WarningLogin"] = "Esta cuenta necesita la confirmación de la Dirección Email.";
                            return View(model);
                        }
                    }
                    else if (us.EstatusUsuario == EstatusUsuario.INACTIVO)
                    {
                        TempData["WarningLogin"] = "El usuario se encuentra deshabilitado, consulte con el administrador";
                    }
                    else
                    {
                        TempData["WarningLogin"] = "Error dirección email no registrada en el sistema.";
                        return View(model);
                    }
                }
                else
                {

                    TempData["ErrorLogin"] = "Error dirección email no registrada en el sistema.";
                    return View(model);
                }
            }

            TempData["Error"] = "al iniciar sesión. Verificar el correo y contraseña.";
            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Lockout()
        {
            return View();
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

    }
}
