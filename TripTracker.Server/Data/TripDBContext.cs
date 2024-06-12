using Microsoft.EntityFrameworkCore;
using TripTracker.Server.Entities;

namespace TripTracker.Server.Data
{
    public class TripDBContext : DbContext
    {
        public TripDBContext(DbContextOptions<TripDBContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Trip>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Trip>()
                .HasOne(t => t.StartAddress)
                .WithMany()
                .HasForeignKey(t => t.StartAddressId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Trip>()
                .HasOne(t => t.EndAddress)
                .WithMany()
                .HasForeignKey(t => t.EndAddressId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Address>()
                .HasOne(t => t.User)
                .WithMany()
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Trip> Trips { get; set; }
    }
}
