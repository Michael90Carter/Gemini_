using AutoMapper;
using Food_Cot.Services.ProductAPI.Models;
using Food_Cot.Services.ProductAPI.Models.Dto;

namespace Food_Cot.Services.ProductAPI
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfiguration = new MapperConfiguration(config =>
            {
                config.CreateMap<ProductDto, Product>();
                config.CreateMap<Product, ProductDto>();
            });

            // Return the correct mappingConfiguration object
            return mappingConfiguration;
        }
    }
}
