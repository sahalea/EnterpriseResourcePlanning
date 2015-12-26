using Erp.BussinessLogic.Accounts;
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
    public class AccountsController : ApiController
    {
        private ChartOfAccountLogic _chartofaccountLogic;
        private AccountReceiptLogic _accountReceipt;
        
        public AccountsController()
        {
            _chartofaccountLogic = new ChartOfAccountLogic();
            _accountReceipt = new AccountReceiptLogic();
        }

        // chart of accounts

        [Route("api/chartofaccount")]
        [HttpGet]
        public Object GetChartOfAccount()
        {
            List<ChartsOfAccount> list = _chartofaccountLogic.GetChartOfAccount();

            return new
            {
                success = true,
                ChartsOfAccount = new { Record = list, TotalRecords = list.Count }
            };
        }
        [Route("api/chartofaccount/query")]
        [HttpGet]
        public object GetChartAccountPageWithQuery(string query, int? start,int? limit)
        {
            List<ChartsOfAccount> list = _chartofaccountLogic.GetChartOfAccountFiltered(query,start,limit)
                                         .ToList<ChartsOfAccount>();
            return new
            {
                success = true,
                ChartsAccount = new { Record = list.Skip(start.Value).Take(limit.Value), TotalRecords = list.Count }
            };
        }

        [Route("api/chartofaccount/{id:int}")]
        [HttpGet]
        public object GetChartOfAccount(int id)
        {
            return new
            {
                success = true,
                ChartsAccount = new { Record = _chartofaccountLogic.GetChartOfAccountById(id), TotalRecord = 1 }
            };
        }

        [Route("api/chartofaccount/save")]
        [HttpPost]
        public Object SaveChartOfAccount(dynamic data)
        {
            ChartsOfAccount chartofaccount = JsonConvert.DeserializeObject<ChartsOfAccount>(data.ToString());

            _chartofaccountLogic.AddorUpdate(chartofaccount);

            return new
            {
                success = true,
                ChartsAccount = new { Record = chartofaccount, TotalRecords = 1 }
            };
        }

        //Account Receipts

        [Route("api/accountreceipt/save")]
        [HttpPost]
        public Object SaveAccountReceipts(dynamic data)
        {
            AccountReceiptMaster accountReceipt = JsonConvert.DeserializeObject<AccountReceiptMaster>(data.ToString());

            _accountReceipt.AddorUpdate(accountReceipt);

            return new
            {
                success = true,
                AccountReceiptMaster = new { Record = accountReceipt, TotalRecords = 1 },
                AccountReceiptDetails = new { Record = accountReceipt.AccountReceiptDetails, TotalRecords = accountReceipt.AccountReceiptDetails.Count }
            };
        }


    }
}
