using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;

namespace Backend.Database
{
    public class LDSDBContext : IdentityDbContext
    {
        public LDSDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Blockchain> blockchains { get; set; }
        public DbSet<Exchange> exchanges { get; set; }
        public DbSet<Metamask> metamasks { get; set; }
        public DbSet<Transactions> transactions { get; set; }
        public DbSet<Contacts> contacts { get; set; }
        public DbSet<Rules> rules { get; set; }
        public DbSet<LoginHistory> loginHistory { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Blockchain>()
                .HasOne(o => o.applicationUser)
                .WithMany(o => o.blockchains)
                .HasForeignKey(o => o.Id);

            builder.Entity<Exchange>()
                .HasOne(o => o.applicationUser)
                .WithMany(o => o.exchanges)
                .HasForeignKey(o => o.Id);

            builder.Entity<Metamask>()
                .HasOne(o => o.applicationUser)
                .WithMany(o => o.metamasks)
                .HasForeignKey(o => o.Id);

            builder.Entity<Transactions>()
               .HasOne(o => o.applicationUser)
               .WithMany(o => o.transactions)
               .HasForeignKey(o => o.Id);

            builder.Entity<Contacts>()
               .HasOne(o => o.applicationUser)
               .WithMany(o => o.contacts)
               .HasForeignKey(o => o.Id);

            builder.Entity<Rules>()
               .HasOne(o => o.applicationUser)
               .WithMany(o => o.rules)
               .HasForeignKey(o => o.Id);

            builder.Entity<LoginHistory>()
               .HasOne(o => o.applicationUser)
               .WithMany(o => o.loginHistory)
               .HasForeignKey(o => o.Id);

            builder.ApplyConfiguration(new ApplicationUserEntityConfiguration());
        }
    }
    public class ApplicationUserEntityConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.Property(u => u.firstName).HasMaxLength(50);
            builder.Property(u => u.lastName).HasMaxLength(50);
            builder.Property(u => u.img).HasMaxLength(50);
            builder.Property(u => u.typeUser).HasMaxLength(50);
            builder.Property(u => u.lastVisit).HasMaxLength(50);
        }
    }
}
