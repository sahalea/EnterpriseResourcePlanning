using Erp.BussinessLogic.Sales;
using Erp.DataMapping.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Erp.Client.Controllers
{

    public class CustomerController : ApiController
    {
        private CustomerLogic _customerLogic;
        private CustomerContactLogic _customerContacLogic;
        private DailyCustomerVisitLogic _customerVisitLogic;

        public CustomerController()
        {
            _customerLogic = new CustomerLogic();
            _customerContacLogic = new CustomerContactLogic();
            _customerVisitLogic = new DailyCustomerVisitLogic();
        }
        [Route("api/customer")]
        [HttpGet]
        public Object GetCustomers()
        {
            List<Customers> list = _customerLogic.GetCustomers();

            return new
            {
                success = true,
                Customers = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/customer/query")]
        [HttpGet]
        public Object GetCustomerPagedWithQuery(string query, int? start, int? limit)
        {
            List<Customers> list = _customerLogic.GetCustomerFiltered(query, start, limit).ToList<Customers>();
            
            return new
            {
                success = true,
                Customers = new { Record = list.Skip(start.Value).Take(limit.Value), TotalRecords = list.Count }
            };
        }

        [Route("api/customer/{id:int}")]
        [HttpGet]
        public object GetCustomer(int id)
        {
            var customer = _customerLogic.GetCustomerById(id);

            return new
            {
                success = true,
                Customers = new { Record = customer, TotalRecords = 1 }
            };
        }

        [Route("api/customer/save")]
        [HttpPost]
        public Object SaveCustomer(dynamic data)
        {
            var customer = JsonConvert.DeserializeObject<Customers>(data.ToString());
            var customerDetails = JsonConvert.DeserializeObject<CustomerDetails>(data.ToString());

            customer = _customerLogic.AddorUpdate(customer, customerDetails);

            return new
            {
                success = true,
                Customers = new { Record = customer, TotalRecords = 1 },
                CustomerDetails = new { Record = customerDetails, TotalRecords = 1 }
            };

        }

        [Route("api/deleteCustomer")]
        [HttpGet]
        public void DeleteCustomers(int id)
        {
            _customerLogic.DeleteCustomer(id);
        }

        //customerContacts

        [Route("api/customerContact")]
        [HttpGet]
        public Object GetCustomerContact()
        {
            List<CustomerContacts> list = _customerContacLogic.GetCustomerContact();

            return new
            {
                success = true,
                CustomerContacts = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/customerContact/query")]
        [HttpGet]
        public Object GetCustomerContactPagedWithQuery(string query,int? start,int? limit)
        {
            List<CustomerContacts> list = _customerContacLogic.GetCustomerContactFiltered(query,start,limit).ToList<CustomerContacts>();
            return new
            {
                success = true,
                CustomerContacts = new { Record = list.Skip(start.Value).Take(limit.Value), TotalRecords = list.Count }
            };
        }

        [Route("api/customercontacts/{id:int}")]
        [HttpGet]
        public object GetCustomerContactByCustomerId(int id)
        {
            List<CustomerContacts> customerContact = _customerContacLogic.GetCustomerContactsByCustomerId(id);

            return new
            {
                success = true,
                CustomerContacts = new { Record = customerContact, TotalRecords = customerContact.Count }
            };
        }

        [Route("api/customerContact/{id:int}")]
        [HttpGet]
        public object GetCustomerContactById(int id)
        {
            var customerContact = _customerContacLogic.GetCustomerContactById(id);

            return new
            {
                success = true,
                CustomerContacts = new { Record = customerContact, TotalRecords = 1 }
            };
        }

        [Route("api/contactCustomerId/{id:int}")]
        [HttpGet]
        public object GetContactByCustomerId(int id)
        {
            return _customerContacLogic.GetContactByCustomerId(id);
        }

        [Route("api/customerContacts/save")]
        [HttpPost]
        public object SaveCustomerContacts(dynamic data)
        {
            var customerContacts = JsonConvert.DeserializeObject<CustomerContacts>(data.ToString());

            _customerContacLogic.AddorUpdate(customerContacts);

            return new
            {
                success = true,
                CustomerContacts = new { Record = customerContacts, TotalRecords = 1 }
            };
        }

        [Route("api/deleteCustomerContact")]
        [HttpGet]
        public void DeleteCustomerContact(int id)
        {
            _customerContacLogic.DeleteCustomerContact(id);
        }

        //Daily customer visit

        [Route("api/customervisit")]
        [HttpGet]
        public Object GetDailyCustomerVisit()
        {
            List<DailyCustomerVisit> list = _customerVisitLogic.GetCustomerVisit();

            return new
            {
                success = true,
                DailyCustomerVisit = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/customerVisit/query")]
        [HttpGet]
        public Object GetCustomerVisitPagedWithQuery(string query,int? start, int? limit)
        {
            List<DailyCustomerVisit> list = _customerVisitLogic.GetCustomerVisitFiltered(query,start,limit).ToList<DailyCustomerVisit>();
            return new
            {
                success = true,
                DailyCustomerVisit = new { Record = list.Skip(start.Value).Take(limit.Value), TotalRecords = list.Count }
            };
        }

        [Route("api/customerVisit/{id:int}")]
        [HttpGet]
        public object GetCustomerVisitById(int id)
        {
            return _customerVisitLogic.GetCustomerVisitById(id);
        }

        [Route("api/customerVisit/save")]
        [HttpPost]
        public object SaveDailyCustomerVisit(dynamic data)
        {
            var customerVisit = JsonConvert.DeserializeObject<DailyCustomerVisit>(data.ToString());

            _customerVisitLogic.AddorUpdate(customerVisit);

            return new
            {
                success = true,
                DailyCustomerVisit = new { Record = customerVisit, TotalRecords = 1 }
            };
        }

        [Route("api/deletecustomerVisit")]
        [HttpGet]
        public void DeleteCustomerVisit(int id)
        {
            _customerVisitLogic.DeleteCustomerVisit(id);
        }

    }
}