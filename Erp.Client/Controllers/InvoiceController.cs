using Erp.BussinessLogic.Transaction;
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
    public class InvoiceController : ApiController
    {
        private InvoiceLogic _invoiceLogic;
        private ProInvoiceLogic _proInvoiceLogic;

        public InvoiceController()
        {
            _invoiceLogic = new InvoiceLogic();
            _proInvoiceLogic = new ProInvoiceLogic();
        }
        
        [Route("api/invoice")]
        [HttpGet]
        public Object GetEnquiry()
        {
            List<InvoiceMaster> list = _invoiceLogic.GetInvoice();

            return new
            {
                success = true,
                InvoiceMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/invoice/query")]
        [HttpGet]
        public Object GetInvoicePagedWithQuery(string query)
        {
            List<InvoiceMaster> list = _invoiceLogic.GetInvoiceFiltered(query);
            return new
            {
                success = true,
                InvoiceMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/invoice/{id:int}")]
        [HttpGet]
        public object GetInvoice(int id)
        {
            return new
            {
                success = true,
                InvoiceMaster = new { Record = _invoiceLogic.GetInvoiceById(id), TotalRecord = 1 }
            };
        }

        [Route("api/invoicebycustomer/{id:int}")]
        [HttpGet]
        public Object GetInvoiceByCustomer(int id)
        {
            List<InvoiceMaster> invoiceMater = _invoiceLogic.GetInvoiceByCustomerId(id);
            return new
            {
                success = true,
                InvoiceMaster = new { Record = invoiceMater, TotalRecords = invoiceMater.Count }
            };
        }

        [Route("api/invoice/save")]
        [HttpPost]
        public Object SaveInvoice(dynamic data)
        {
            InvoiceMaster invoiceMaster = JsonConvert.DeserializeObject<InvoiceMaster>(data.ToString());
            _invoiceLogic.AddorUpdate(invoiceMaster);

            return new
            {
                success = true,
                InvoiceMaster = new { Record = invoiceMaster, TotalRecords = 1 },
                InvoiceDetails = new { Record = invoiceMaster.InvoiceDetails, TotalRecords = invoiceMaster.InvoiceDetails.Count }
            };
        }

        // proInvoice

        [Route("api/Proformainvoice")]
        [HttpGet]
        public Object GetProFormaInvoice()
        {
            List<ProFormaInvoiceMaster> list = _proInvoiceLogic.GetInvoice();

            return new
            {
                success = true,
                ProFormaInvoiceMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/proformainvoice/query")]
        [HttpGet]
        public Object GetProFormaInvoicePagedWithQuery(string query)
        {
            List<ProFormaInvoiceMaster> list = _proInvoiceLogic.GetInvoiceFiltered(query);
            return new
            {
                success = true,
                ProFormaInvoiceMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/proforma/{id:int}")]
        [HttpGet]
        public object GetProFormaInvoice(int id)
        {
            return new
            {
                success = true,
                ProFormaInvoiceMaster = new { Record = _proInvoiceLogic.GetInvoiceById(id), TotalRecord = 1 }
            };
        }

        [Route("api/proformainvoice/save")]
        [HttpPost]
        public Object SaveProFormaInvoice(dynamic data)
        {
            ProFormaInvoiceMaster invoiceMaster = JsonConvert.DeserializeObject<ProFormaInvoiceMaster>(data.ToString());
            _proInvoiceLogic.AddorUpdate(invoiceMaster);

            return new
            {
                success = true,
                ProFormaInvoiceMaster = new { Record = invoiceMaster, TotalRecords = 1 },
                ProFormaInvoiceDetails = new { Record = invoiceMaster.ProFormaInvoiceDetails, TotalRecords = invoiceMaster.ProFormaInvoiceDetails.Count }
            };
        }
    }
}
