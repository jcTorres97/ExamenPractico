using Domain.AspNet;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static Common.Enumeraciones;

namespace Repository.Context
{
    public class ApplicationDbSeeder
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private bool _seeded;

        public ApplicationDbSeeder(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            // We take a dependency on the manager as we want to create a valid user
            _userManager = userManager;
            _roleManager = roleManager;

        }
        public async Task EnsureSeed()
        {
            if (!_seeded)
            {
                try
                {
                    // First we check if an existing user can be found for the configured demo credentials
                    var existingUser = await _userManager.FindByEmailAsync("admin@admin.com");
                  

                    // If an existing user was found
                    if (existingUser != null )
                    {
                        // Notify the developer
                        Console.WriteLine("Database already seeded!");

                        // Then seeding has already taken place
                        _seeded = true;
                        return;
                    }

                    string[] roleNames = { "Administrador"};
                    IdentityResult roleResult;
                    ApplicationRole aspNetRole = null;


                    foreach (var roleName in roleNames)
                    {
                        aspNetRole = new ApplicationRole();

                        var roleExist = await _roleManager.RoleExistsAsync(roleName);
                        if (!roleExist)
                        {
                            aspNetRole.Name = roleName;
                            roleResult = await _roleManager.CreateAsync(aspNetRole);
                        }
                    }

                    // Prepare the new user with the configured demo credentials
                    var user = new ApplicationUser
                    {

                        EstatusUsuario = EstatusUsuario.ACTIVO,
                        UserName = "Administrador",
                        Email = "admin@admin.com",
                        EmailConfirmed = true,
                        RowVersion = DateTime.Now
                    };

                    


                    // Attempt to create the demo user in the data store using the configured demo password
                    if (existingUser == null)
                    {
                        var result = await _userManager.CreateAsync(user, "Password1.");
                        await _userManager.AddToRoleAsync(user, "Administrador");
                        Console.WriteLine(result.Succeeded ? "Database successfully seeded!" : "Database already seeded!");
                    }
                    

                    // Notify the developer whether the demo user was created successfully


                    // We either already have the demo user or it was just added, either way we're good
                    _seeded = true;
                    return;
                }
                catch (Exception ex)
                {
                    // Notify the developer that storing the demo user encountered an error
                    Console.Error.WriteLine("Error trying to seed the database");
                    Console.Error.WriteLine(ex);
                    return;
                }
            }

            // Notify the developer
            Console.WriteLine("Database already seeded!");
        }
    }
}
