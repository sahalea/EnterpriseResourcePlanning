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
    public class TransactionController : ApiController
    {
        private EnquiryLogic _enquiryLogic;
        private QuotationLogic _quotationLogic;
        private SalesOrderLogic _salesOrderLogic;
        private DeliveryNoteLogic _deliveryNoteLogic;

        public TransactionController()
        {
            _enquiryLogic = new EnquiryLogic();
            _quotationLogic = new QuotationLogic();
            _salesOrderLogic = new SalesOrderLogic();
            _deliveryNoteLogic = new DeliveryNoteLogic();
        }

        //Enquiry 

        [Route("api/enquiry")]
        [HttpGet]
        public Object GetEnquiry()
        {
            List<EnquiryMaster> list = _enquiryLogic.GetEnquiry();

            return new
            {
                success = true,
                EnquiryMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/enquiry/query")]
        [HttpGet]
        public Object GetEnquiryPagedWithQuery(string query,int? start,int? limit)
        {
            List<EnquiryMaster> list = _enquiryLogic.GetEnquiryFiltered(query,start,limit).ToList<EnquiryMaster>();
            return new
            {
                success = true,
                EnquiryMaster = new { Record = list.Skip(start.Value).Take(limit.Value), TotalRecords = list.Count }
            };
        }

        [Route("api/enquiry/{id:int}")]
        [HttpGet]
        public object GetEnquiry(int id)
        {
            return new
            {
                success = true,
                EnquiryMaster = new { Record = _enquiryLogic.GetEnquiryById(id), TotalRecord = 1 }
            };
        }

        [Route("api/enquiry/save")]
        [HttpPost]
        public Object SaveEnquiry(dynamic data)
        {
            EnquiryMaster enquiryMaster = JsonConvert.DeserializeObject<EnquiryMaster>(data.ToString());
            _enquiryLogic.AddorUpdate(enquiryMaster);

            return new
            {
                success = true,
                EnquiryMaster = new { Record = enquiryMaster, TotalRecords = 1 },
                EnquiryDetails = new { Record = enquiryMaster.EnquiryDetails, TotalRecords = enquiryMaster.EnquiryDetails.Count }
            };
        }

        // Quotation

        [Route("api/quotation")]
        [HttpGet]
        public Object GetQuotation()
        {
            List<QuotationMaster> list = _quotationLogic.GetQuotation();

            return new
            {
                success = true,
                QuotationMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/quotation/query")]
        [HttpGet]
        public Object GetQuotationPagedWithQuery(string query, int? start, int? limit)
        {
            List<QuotationMaster> list = _quotationLogic.GetQuotationFiltered(query, start, limit).ToList<QuotationMaster>();
            return new
            {
                success = true,
                QuotationMaster = new { Record = list.Skip(start.Value).Take(limit.Value), TotalRecords = list.Count }
            };
        }

        [Route("api/quotations/{id:int}")]
        [HttpGet]
        public object GetQuotationByCustomerId(int id)
        {
            List<QuotationMaster> quotation = _quotationLogic.GetQuotationByCustomerId(id);

            return new
            {
                success = true,
                QuotationMaster = new { Record = quotation, TotalRecords = quotation.Count }
            };
        }

        [Route("api/quotation/{id:int}")]
        [HttpGet]
        public object GetQuotation(int id)
        {
            return new
            {
                success = true,
                QuotationMaster = new { Record = _quotationLogic.GetQuotationById(id), TotalRecord = 1 }
            };
        }

        [Route("api/quotation/save")]
        [HttpPost]
        public Object SaveQuotation(dynamic data)
        {
            QuotationMaster quotationMaster = JsonConvert.DeserializeObject<QuotationMaster>(data.ToString());
            
            _quotationLogic.AddorUpdate(quotationMaster);

            return new
            {
                success = true,
                QuotationMaster = new { Record = quotationMaster, TotalRecords = 1 },
                QuotationDetails = new { Record = quotationMaster.QuotationDetails, TotalRecords = quotationMaster.QuotationDetails.Count }
            };
        }
         
        // Sales Order

        [Route("api/salesorder")]
        [HttpGet]
        public Object GetSalesOrder()
        {
            List<SalesOrderMaster> list = _salesOrderLogic.GetSalesOrder();

            return new
            {
                success = true,
                SalesOrderMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/salesorder/query")]
        [HttpGet]
        public Object GetSalesOrderPagedWithQuery(string query)
        {
            List<SalesOrderMaster> list = _salesOrderLogic.GetSalesOrderFiltered(query);
            return new
            {
                success = true,
                SalesOrderMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/salesorder/{id:int}")]
        [HttpGet]
        public object GetSalesOrder(int id)
        {
            return new
            {
                success = true,
                SalesOrderMaster = new { Record = _salesOrderLogic.GetSalesOrderById(id), TotalRecord = 1 }
            };
        }

        [Route("api/salesorder/save")]
        [HttpPost]
        public Object SaveSalesOrder(dynamic data)
        {
            SalesOrderMaster salesOrderMaster = JsonConvert.DeserializeObject<SalesOrderMaster>(data.ToString());

            _salesOrderLogic.AddorUpdate(salesOrderMaster);

            return new
            {
                success = true,
                SalesOrderMaster = new { Record = salesOrderMaster, TotalRecords = 1 },
                SalesOrderDetails = new { Record = salesOrderMaster.SalesOrderDetails, TotalRecords = salesOrderMaster.SalesOrderDetails.Count }
            };
        }

        [Route("api/deliverynote")]
        [HttpGet]
        public Object GetDeliveryNote()
        {
            List<DeliveryNoteMaster> list = _deliveryNoteLogic.GetDeliveryNote();

            return new
            {
                success = true,
                DeliveryNoteMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("    ")]
        [HttpGet]
        public Object GetDeliveryPagedWithQuery(string query)
        {
            List<DeliveryNoteMaster> list = _deliveryNoteLogic.GetDeliveryFiltered(query);
            return new
            {
                success = true,
                DeliveryNoteMaster = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/deliverynote/{id:int}")]
        [HttpGet]
        public object GetDeliveryNote(int id)
        {
            return new
            {
                success = true,
                DeliveryNoteMaster = new { Record = _deliveryNoteLogic.GetDeliveryNoteById(id), TotalRecord = 1 }
            };
        }

        [Route("api/deliverynote/save")]
        [HttpPost]
        public Object SaveDeliveryNote(dynamic data)
        {
            DeliveryNoteMaster deliveryNoteMaster = JsonConvert.DeserializeObject<DeliveryNoteMaster>(data.ToString());

            _deliveryNoteLogic.AddorUpdate(deliveryNoteMaster);

            return new
            {
                success = true,
                DeliveryNoteMaster = new { Record = deliveryNoteMaster, TotalRecords = 1 },
                DeliveryNoteDetails = new { Record = deliveryNoteMaster.DeliveryNoteDetails, TotalRecords = deliveryNoteMaster.DeliveryNoteDetails.Count }
            };
        }
    }
}
