using Microsoft.EntityFrameworkCore;
using TripTracker.Server.Authentication;
using TripTracker.Server.Authentication.Contract;
using TripTracker.Server.Data;
using TripTracker.Server.Entities;
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

            builder.Services.AddAuthorization();

            builder.Services.AddIdentityApiEndpoints<User>()
                        .AddEntityFrameworkStores<TripDBContext>();

            builder.Services.AddScoped<ITripRepository, TripRepository>();
            builder.Services.AddScoped<IServerAuthentication, ServerAuthentication>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: CorsPolicy,
                                policy =>
                                {
                                    policy.WithOrigins("http://localhost:5173", "https://localhost:5173", "https://localhost:7035", "http://localhost:7035")
                                        .AllowAnyMethod()
                                        .AllowAnyHeader()
                                        .AllowCredentials();
                                });
            });

            var app = builder.Build();

            app.MapIdentityApi<User>();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors(CorsPolicy);

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
