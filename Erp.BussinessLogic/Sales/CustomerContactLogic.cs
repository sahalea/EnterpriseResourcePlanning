using Erp.BussinessLogic.Core;
using Erp.DataAccess.Sales;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.BussinessLogic.Sales
{
    public class CustomerContactLogic :IBaseLogic
    {
        public CustomerContactRepository _customerContactRepository;
        public CustomerContactLogic()
        {
            _customerContactRepository = new CustomerContactRepository();
        }


        public List<CustomerContacts> GetCustomerContact()
        {
            return _customerContactRepository.GetAll().ToList<CustomerContacts>();
        }

        public List<CustomerContacts> GetCustomerContactsByCustomerId(int customerId)
        {
            return _customerContactRepository.GetAll().Where(a=>a.CustomerId==customerId).ToList<CustomerContacts>();
        }
        public Object GetCustomerContactById(int customerContactId)
        {
            return _customerContactRepository.GetById(customerContactId);            
        }

        public Object GetContactByCustomerId(int customerId)
        {
            CustomerContacts customerContacts = _customerContactRepository.Single(a => a.CustomerId == customerId);

            if (customerContacts != null)
            {
                return new
                {
                    CustomerContacts = new { data = customerContacts, total = 1 },
                };
            }
            else
            {
                return null;
            }
        }
        public IEnumerable<CustomerContacts> GetCustomerContactFiltered(String query,int? start,int? limit)
        {

            if (query != null)
            {
                return _customerContactRepository.GetFiltered(query);
              
            }
            else
            {
                return _customerContactRepository.GetAll().OrderBy(a => a.CustomerContactId);
            }
        }

        public CustomerContacts AddorUpdate(CustomerContacts customerContacts)
        {
            _customerContactRepository.AddOrUpdate(customerContacts);
            _customerContactRepository.SaveChanges();


            return customerContacts;
        }

        public void Dispose()
        {

            if (_customerContactRepository != null)
                _customerContactRepository.Dispose();
        }

        public void DeleteCustomerContact(int id)
        {
            CustomerContacts _customercontact = _customerContactRepository.GetById(id);
            _customerContactRepository.Delete(_customercontact);
            _customerContactRepository.SaveChanges();
        }
    }
}
