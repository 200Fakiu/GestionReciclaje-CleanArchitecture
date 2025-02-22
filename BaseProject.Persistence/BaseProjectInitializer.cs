﻿using BaseProject.Domain;
using BaseProject.Domain.Constants;
using System;
using System.Linq;
using Whoever.Entities.Common;

namespace BaseProject.Persistence
{
    public class BaseProjectInitializer
    {
        //private readonly Dictionary<int, Employee> Employees = new Dictionary<int, Employee>();
        //private readonly Dictionary<int, Supplier> Suppliers = new Dictionary<int, Supplier>();
        //private readonly Dictionary<int, Category> Categories = new Dictionary<int, Category>();
        //private readonly Dictionary<int, Shipper> Shippers = new Dictionary<int, Shipper>();
        //private readonly Dictionary<int, Product> Products = new Dictionary<int, Product>();

        public static void Initialize(BaseProjectDbContext context)
        {
            var initializer = new BaseProjectInitializer();
            initializer.SeedEverything(context);
        }

        public void SeedEverything(BaseProjectDbContext context)
        {
            context.Database.EnsureCreated();

            SeedRoles(context);
            SeedUsers(context);
            //return; // Db has been seeded

            if (context.Roles.Any())
            {
                return; // Db has been seeded
            }

            //SeedRegions(context);

            //SeedTerritories(context);

            //SeedEmployees(context);

            //SeedCategories(context);

            //SeedShippers(context);

            //SeedSuppliers(context);

            //SeedProducts(context);

            //SeedOrders(context);
        }
        private void SeedMunicipio(BaseProjectDbContext context)
        {
            var mun = new Municipio() {
                Name="Resistencia"
            };
            context.Municipios.Add(mun);
            context.SaveChanges();
        }

        private void SeedRoles(BaseProjectDbContext context)
        {
            var roles = new[]
            {
                new Role { Id = RolesNames.Admin.Id, Name = RolesNames.Admin.Name, NormalizedName = RolesNames.Admin.Name.ToUpper() },
                new Role { Id = RolesNames.SuperAdmin.Id, Name = RolesNames.SuperAdmin.Name, NormalizedName = RolesNames.SuperAdmin.Name.ToUpper() },
                new Role { Id = RolesNames.Operator.Id, Name = RolesNames.Operator.Name, NormalizedName = RolesNames.Operator.Name.ToUpper() }
            };
            context.Roles.AddRange(roles);
            context.SaveChanges();
        }

        private void SeedUsers(BaseProjectDbContext context)
        {

            var userSuperAdmin = new User() { FirstName = "Super Admin", LastName = "Super Admin",
                                              Email = "super_admin@gmail.com", UserName = "super_admin@gmail.com",
                                              NormalizedEmail = "super_admin@gmail.com".ToUpper(),
                                              NormalizedUserName = "super_admin@gmail.com".ToUpper(),
                                              CreationTime = DateTime.Now,
                                              ConcurrencyStamp = "72f1a523-bd84-4ce3-837e-7bb1ae0a858e",
                                              SecurityStamp = "5C2PYGYDGPP7T455XEEIDXXQUSECSQMJ",
                                              PasswordHash = "AQAAAAEAACcQAAAAEDaNjfiSXFkS4J9t4PThBC1uD8LkqiX7sah5wkqXhPz7Gqbvtkqtz+cVc5/k6CpwRg=="
            };
            context.Users.Add(userSuperAdmin);
            var userRole = new UserRole() {
                RoleId = RolesNames.SuperAdmin.Id,
                UserId = userSuperAdmin.Id
            };
            context.UserRoles.Add(userRole);
            //context.Users.AddRange(users);

            context.SaveChanges();
        }

        /*
         context.Database.OpenConnection();
    try
    {
        context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Employees ON");
        context.SaveChanges();
        context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Employees OFF");
    }
    finally
    {
        context.Database.CloseConnection();
    }*/
    }
}
