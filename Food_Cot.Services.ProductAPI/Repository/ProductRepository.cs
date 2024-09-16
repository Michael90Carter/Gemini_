using System;
using System.Linq;
using System.Threading.Tasks;
using Food_Cot.Services.ProductAPI.DbContexts;
using Food_Cot.Services.ProductAPI.Models;
using Food_Cot.Services.ProductAPI.Models.Dto;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Collections.Generic;

namespace Food_Cot.Services.ProductAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        public ProductRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ProductDto> CreateUpdateProduct(ProductDto productDto)
        {
            Product product = _mapper.Map<ProductDto, Product>(productDto);

            // If the product ID exists, it's an update; otherwise, it's a new product
            if (product.ProductId > 0)
            {
                _db.Products.Update(product);
            }
            else
            {
                await _db.Products.AddAsync(product);
            }

            await _db.SaveChangesAsync();

            // Return the saved/updated product as a DTO
            return _mapper.Map<Product, ProductDto>(product);
        }

        public async Task<bool> DeleteProduct(int productId)
        {
            try
            {
                Product product = await _db.Products.FirstOrDefaultAsync(u => u.ProductId == productId);
                if (product == null)
                {
                    return false;
                }
                _db.Products.Remove(product);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<ProductDto> GetProductById(int productId)
        {
            // Use FirstOrDefaultAsync instead of FirstOrDefault
            var product = await _db.Products.FirstOrDefaultAsync(x => x.ProductId == productId);

            // Return the mapped DTO, handle null in case the product isn't found
            return _mapper.Map<ProductDto>(product);
        }


        public async Task<IEnumerable<ProductDto>> GetProducts()
        {
            List<Product> productList = await _db.Products.ToListAsync();
            return _mapper.Map<List<ProductDto>>(productList);
        }


    }
}
