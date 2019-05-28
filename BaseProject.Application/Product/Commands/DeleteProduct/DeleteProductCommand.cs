﻿using System;
using BaseProject.Application.Infrastructure.Request.Commands.Update;
using BaseProject.Domain;
using MediatR;
using Whoever.Common.Mapping;

namespace BaseProject.Application.Plant.Commands.DeletePlant
{
    public class DeleteProductCommand : IRequest
    {
        public Guid ProductId{ get; set; }
    }
}
