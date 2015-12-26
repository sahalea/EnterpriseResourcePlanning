using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text.RegularExpressions;
using System.Web.Mvc;
using System.Web.UI;
using System.Web;
using System.Web.UI.WebControls;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;

namespace Erp.Client.Controllers
{
    public class ReportsController : Controller
    {
        public object MessageBox { get; private set; }

        // GET: Reports
        public ActionResult Index()
        {

            /*String _reportPath = "";
            if(System.IO.File.Exists(Server.MapPath(_reportPath)))
            {
                System.Web.UI.Page page = this;
                string vprinter = "";
                string vLetter = "";
                Components.ReportViewer rprt = new Components.ReportViewer(ref page);
            }*/

            try
            {
                ReportDocument cryRpt = null;
                ExportOptions CrExportOptions;
                DiskFileDestinationOptions CrDiskFileDestinationOptions = new DiskFileDestinationOptions();
                PdfRtfWordFormatOptions CrFormatTypeOptions = new PdfRtfWordFormatOptions();
                CrDiskFileDestinationOptions.DiskFileName = "E:\\csharp.net-informations.pdf";
                CrExportOptions = cryRpt.ExportOptions;
                {
                    CrExportOptions.ExportDestinationType = ExportDestinationType.DiskFile;
                    CrExportOptions.ExportFormatType = ExportFormatType.PortableDocFormat;
                    CrExportOptions.DestinationOptions = CrDiskFileDestinationOptions;
                    CrExportOptions.FormatOptions = CrFormatTypeOptions;
                }
                cryRpt.Export();
            }
            catch (Exception ex)
            {
            }
            return View();
        }
    }
} 