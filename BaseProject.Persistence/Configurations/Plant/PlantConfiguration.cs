﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Whoever.Data.EntityFramework;

namespace BaseProject.Persistence.Configurations.Plant
{
    public class PlantConfiguration : BaseEntityTypeConfiguration<BaseProject.Domain.Plant>
    {

        public override void Configure(EntityTypeBuilder<BaseProject.Domain.Plant> builder)
        {

            base.Configure(builder);

            builder
                .Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder
                .Property(x => x.Address)
                .IsRequired()
                .HasMaxLength(200);
            

            builder.Property(x => x.IsDeleted)
                   .HasDefaultValue(false);


            //////////////////////////////////////////
            /// FKs
            //////////////////////////////////////////
            ///

            builder
                .HasOne(x =>x.Municipio)
                .WithMany(x => x.Plants)
                .HasForeignKey(x => x.MunicipioId);

            builder
                    .HasMany(x => x.Users);

        }
    }
}
