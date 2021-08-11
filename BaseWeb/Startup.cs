using Domain.AspNet;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Repository.Context;
using Services.IServicios;
using Services.Servicios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BaseWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        private const string ConnectionString = "DefaultConnection";
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           
            
            services.AddRazorPages().AddRazorRuntimeCompilation();
            services.AddDbContext<ApplicationDbContext>(options =>
                  options.UseSqlServer(
                      Configuration.GetConnectionString(ConnectionString),
                      b => b.MigrationsAssembly("Repository")));
            services.AddSession(opts =>
            {
                opts.IdleTimeout = TimeSpan.FromDays(4);
                opts.Cookie.IsEssential = true;
            });
            services.AddIdentity<ApplicationUser, ApplicationRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();
            services.AddTransient<ApplicationDbSeeder>();
            services.AddControllersWithViews();
            services.AddRazorPages();
            services.AddTransient<ApplicationUserServicio>();
            services.AddTransient<IApplicationUserServicio, ApplicationUserServicio>();
            services.AddTransient<ISucursalServicio, SucursalServicio>();
            services.AddTransient<IProductoServicio, ProductoServicio>();
            services.AddTransient<IInventarioServicio, InventarioServicio>();
            services.AddTransient<IBitacoraServicio, BitacoraServicio>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbSeeder dbSeeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            if (!env.IsProduction())
            {
                // Ensure we have the default user added to the store
                dbSeeder.EnsureSeed().GetAwaiter().GetResult();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    }
}
