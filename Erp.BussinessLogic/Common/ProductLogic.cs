using Erp.BussinessLogic.Core;
using Erp.DataAccess.Common;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.BussinessLogic.Common
{
    public class ProductLogic : IBaseLogic
    {
        private ProductRepository _productRepository;

        public ProductLogic()
        {
            _productRepository = new ProductRepository();
        }

        public List<Product> GetProduct()
        {
            return _productRepository.GetAll().ToList<Product>();
        }



        public Object GetProductById(int productId)
        {
            Product product = _productRepository.Single(a => a.ProductId == productId);

            if (product != null)
            {
                return new
                {
                    Product = new { data = product, total = 1 }
                };
            }
            else
            {
                return null;
            }

        }


        public List<Product> GetProductFiltered(String query)
        {

            if (query != null)
            {
                return _productRepository.Find(a => a.Name.Contains(query) || a.ProductCode.Contains(query))
                .OrderBy(a => a.ProductId)
                .Skip(0)
                .Take(25).ToList<Product>();
            }
            else
            {
                return _productRepository.GetAll().OrderBy(a => a.ProductId).Skip(0).Take(25).ToList<Product>();
            }


        }
        public Product AddorUpdate(Product product)
        {
            _productRepository.AddOrUpdate(product);
            _productRepository.SaveChanges();

            return product;
        }

        public void Dispose()
        {
            if (_productRepository != null)
                _productRepository.Dispose();
        }

    }
}