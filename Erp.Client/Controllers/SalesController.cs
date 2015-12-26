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
    public class SalesController : ApiController
    {

        private SalesExecutiveLogic _salesExecutiveLogic;

        public SalesController()
        {
            _salesExecutiveLogic = new SalesExecutiveLogic();
        }

        [Route("api/executive")]
        [HttpGet]
        public Object GetSalesExecutives()
        {
            List<SalesExecutive> list = _salesExecutiveLogic.GetSalesExecutives();

            return new
            {
                success = true,
                SalesExecutive = new { Record = list, TotalRecords = list.Count }
            };
        }
        
        [Route("api/executive/query")]
        [HttpGet]
        public Object GetSalesExecutivePagedWithQuery(string query,int? start, int? limit)
        {
            List<SalesExecutive> list = _salesExecutiveLogic.GetSalesExecutiveFiltered(query,start,limit).ToList<SalesExecutive>();
            return new
            {
                success = true,
                SalesExecutive = new { Record = list.Skip(start.Value).Take(limit.Value), TotalRecords = list.Count }
            };
        }

        [Route("api/executive/{id:int}")]
        [HttpGet]
        public object GetCustomer(int id)
        {
            return _salesExecutiveLogic.GetSalesExecutiveById(id);
        }

        [Route("api/executive/save")]
        [HttpPost]
        public Object SaveSalesExecutive(dynamic data)
        {
            var salesExecutive = JsonConvert.DeserializeObject<SalesExecutive>(data.ToString());

            _salesExecutiveLogic.AddorUpdate(salesExecutive);

            return new
            {
                success = true,
                SalesExecutive = new { Record = salesExecutive, TotalRecords = 1 },
            };
        }

        [Route("api/deletesalesexecutive")]
        [HttpGet]
        public void DeleteSalesExecutive(int id)
        {
            _salesExecutiveLogic.DeleteSalesExecutive(id);
        }
    }
}
