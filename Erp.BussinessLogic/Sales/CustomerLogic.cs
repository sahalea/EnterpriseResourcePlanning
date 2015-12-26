using Erp.BussinessLogic.Core;
using Erp.DataAccess.Sales;
using Erp.DataAccess.Common;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace Erp.BussinessLogic.Sales
{
    public class CustomerLogic : IBaseLogic
    {
        private CustomerRepository _customerRepository;
        private CountryRepository _countryRepository;

        public CustomerLogic()
        {
            _customerRepository = new CustomerRepository();
            _countryRepository = new CountryRepository();
        }

        public List<Customers> GetCustomers()
        {
            
            return _customerRepository.GetAll().ToList<Customers>();
        }      

        public Object GetCustomerById(int customerId)
        {
            return  _customerRepository.GetById(customerId);

            
        }

        public IEnumerable<Customers> GetCustomerFiltered(String query, int? start, int? limit)
        {
            if (query != null)
            {
                return _customerRepository.GetFiltered(query);
            }
            else
            {
                return _customerRepository.GetAll().OrderBy(a => a.CustomerId);
            }
        }
        public Customers AddorUpdate(Customers customer, CustomerDetails details)
        { 
            HashSet<CustomerDetails> _details = new HashSet<CustomerDetails>();
            _details.Add(details);
            customer.CustomerDetails = _details;

            _customerRepository.AddOrUpdate(customer);
            _customerRepository.SaveChanges();

            return _customerRepository.GetById(customer.CustomerId);
        }
        public void Dispose()
        {
            if (_customerRepository != null)
                _customerRepository.Dispose();
        }
        public void DeleteCustomer(int id)
        {
            Customers _customer = _customerRepository.GetById(id);
           _customerRepository.Delete(_customer);
            _customerRepository.SaveChanges();           
        }
    }

}
