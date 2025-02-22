﻿using System;
using System.Collections.Generic;
using AutoMapper;
using BaseProject.Application.Infrastructure.Request.Commands.Update;
using BaseProject.Application.Roles;
using BaseProject.Domain;
using MediatR;
using Whoever.Common.Mapping;

namespace BaseProject.Application.Category.Commands.UpdateCategory
{
    public class UpdateCategoryCommand : UpdateCommand, IRequest
    {
        public Guid CategoryId { get; set; }
        public Guid? ParentId { get; set; }
        public string Name { get; set; }        

    }
}
