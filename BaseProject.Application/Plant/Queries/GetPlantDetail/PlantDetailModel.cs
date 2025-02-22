﻿using System;
using System.Collections;
using System.Collections.Generic;
using BaseProject.Application.Roles;
using BaseProject.Domain;
using Whoever.Common.Mapping;

namespace BaseProject.Application.Plant.Queries.GetPlantDetail
{
    public class PlantDetailModel
    {
        public Guid PlantId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public Guid MunicipioId { get; set; }
        public int OperatorsQuantity { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
