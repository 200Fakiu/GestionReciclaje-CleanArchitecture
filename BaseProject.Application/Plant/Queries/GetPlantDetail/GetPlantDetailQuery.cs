﻿using System;
using BaseProject.Application.Infrastructure.Request.Queries.GetById;
using BaseProject.Application.Plant.Queries.GetAllPlant;
using MediatR;

namespace BaseProject.Application.Plant.Queries.GetPlantDetail
{
    public class GetPlantDetailQuery :  IRequest<PlantDetailModel>
    {
        public Guid PlantId { get; set; }
    }
}
