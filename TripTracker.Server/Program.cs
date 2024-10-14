
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TripTracker.Server.Authentication;
using TripTracker.Server.Authentication.Contract;
using TripTracker.Server.Data;
using TripTracker.Server.Repositories;
using TripTracker.Server.Repositories.Contracts;

namespace TripTracker.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var CorsPolicy = "_corsPolicy";

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContextPool<TripDBContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("TripTrackerConnection"))
                );

            builder.Services.AddDbContextPool<ApplicationDbContext>(options => 
                options.UseInMemoryDatabase("AppDb")
                );

            builder.Services.AddAuthorization();
            
            builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

            builder.Services.AddScoped<ITripRepository, TripRepository>();
            builder.Services.AddScoped<IServerAuthentication, ServerAuthentication>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: CorsPolicy,
                                policy =>
                                {
                                    policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
                                        .AllowAnyMethod();
                                });
            });

            var app = builder.Build();

            app.MapIdentityApi<IdentityUser>();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            //app.UseCors(policy => 
            //    policy.WithOrigins("http://localhost:5173/", "https://localhost:5173/")
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()
            //);

            //app.UseCors(policy => 
            //    policy.AllowAnyOrigin()
            //    .AllowAnyHeader()
            //    .AllowAnyMethod()
            //);
            app.UseCors(CorsPolicy);

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
