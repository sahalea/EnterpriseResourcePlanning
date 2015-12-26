using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Erp.Client.Models
{
    public class ResponseModel
    {
        public HttpStatusCode status { get; set; }

        public bool success { get; set; }

        public int totalRecords { get; set; }

        public Object results { get; set; }

        public String message { get; set; }
    }
}