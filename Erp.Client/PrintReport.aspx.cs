using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Erp.Client
{
    public partial class PrintReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["ReportName"] != null)
            {
                Boolean printWithAttachment = false;
                string reportPath = "~/Reports/" + Request.QueryString["ReportName"].ToString() + ".rpt";
                if (System.IO.File.Exists(this.Server.MapPath(reportPath)))
                {

                    System.Web.UI.Page page = this;
                    string vprinter = "";
                    string vLetter = "";

                    Components.ReportViewer rprt = new Components.ReportViewer(ref page);
                    string jscript = "<script>" + " history.go(-1)" + "</script>";
                    rprt.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ErpModel"].ConnectionString;
                    rprt.VirtualOutPutPath = "Reports/Temp";
                    rprt.ClearrParameter();
                    rprt.ClearrTextFormula();
                    rprt.VirtualReportFile = reportPath;
                    //"Reports/" + Request.Params["ReportName"] + ".rpt";
                    FormatName = "";

                    int i = 0;
                    for (i = 1; i <= Request.QueryString.AllKeys.Length - 1; i++)
                    {
                        if (Request.QueryString.AllKeys[i] == "format")

                        {
                            FormatName = Request.Params[i];
                        }


                        if (Request.QueryString.AllKeys[i] == "printer")
                        {
                            vprinter = Request.Params[i];
                            continue;
                        }

                        if (Request.QueryString.AllKeys[i] == "Proc")
                        {
                            //vLetter =Biblio.chaine.ToLettre(Request.Params[i]);
                            vLetter = ToLettre1(Request.Params[i]);
                            rprt.AddParameter("vString", vLetter);
                            continue;
                        }

                        if (Request.Params[i].IndexOf(",") != -1)
                        {
                            String[] listOfValues = Request.Params[i].Split(',');

                            for (int j = 0; j < listOfValues.Length; j++)
                            {

                                rprt.AddParameter(Request.QueryString.AllKeys[i], listOfValues[j]);
                            }
                        }
                        else
                        {
                            rprt.AddParameter(Request.QueryString.AllKeys[i], Request.Params[i]);
                            printWithAttachment = true;
                        }
                    }

                    if (FormatName == "")
                        rprt.Export_Type = CrystalDecisions.Shared.ExportFormatType.PortableDocFormat;
                    else
                    {
                        if (FormatName == "Excel")
                            rprt.Export_Type = CrystalDecisions.Shared.ExportFormatType.ExcelRecord;
                    }
                    //Showing Reports
                    try
                    {
                        if (vprinter == "yes")
                        {
                            rprt.ViewReport();
                        }
                        else
                        {
                            String outputFileName = rprt.ExportReport();
                            if (Request.Params["attachmentFolderName"] != null && Request.Params["attachmentFolderName"] != "undefined" && printWithAttachment)
                            {
                                addAttachmentToReport(outputFileName, Server.MapPath("~/Attachments/" + Request.Params["attachmentFolderName"] + "/" + Request.Params["Id"] + ".pdf"));
                            }
                            Response.ClearContent();
                            Response.ClearHeaders();
                            Response.ContentType = "application/pdf";
                            if (System.IO.File.Exists(outputFileName.Replace(".pdf", "temp.pdf")))
                                Response.TransmitFile(outputFileName.Replace(".pdf", "temp.pdf"));
                            else Response.TransmitFile(outputFileName);
                            //Response.TransmitFile(outputFileName);
                            //Response.End();                                                             
                        }
                        //  Response.Write(jscript);
                    }
                    catch (Exception ex)
                    {
                        Response.Write(ex.Message);
                    }
                }
            }
        }

        private void addAttachmentToReport(String reportFileName, String attachmentFile)
        {
            if (System.IO.File.Exists(attachmentFile))
            {
                String[] sourceFiles = { reportFileName, attachmentFile };
                // PdfMerge.MergeFiles(reportFileName.Replace(".pdf", "temp.pdf"), sourceFiles);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ConnectionString"></param>
        /// <param name="Database"></param>
        /// <param name="Server"></param>
        /// <param name="UserID"></param>
        /// <param name="Password"></param>
        /// 


        public void GetDatabaseValues(string ConnectionString, ref String Database, ref String Server, ref String UserID, ref String Password)
        {
            Database = Regex.Match(ConnectionString, "(Initial Catalog=|Database=){1}([\\w-]+)[;]?").Groups[2].Value;
            Server = Regex.Match(ConnectionString, "(Data Source=){1}([\\w-]+)[;]?").Groups[2].Value;
            UserID = Regex.Match(ConnectionString, "(User ID=){1}([\\w-]+)[;]?").Groups[2].Value;
            Password = Regex.Match(ConnectionString, "(Password=){1}([\\w-]+)[;]?").Groups[2].Value;
        }
        //protected void Button1_Click(object sender, EventArgs e)
        //{
        //    if (rptDoc != null)
        //        rptDoc.PrintToPrinter(1, false, 1, 1);
        //}
        /// <summary>
        /// 
        /// </summary>
        public string FormatName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="strs"></param>
        /// <returns></returns>
        public static string ToLettre1(string strs)
        {

            string strd = "";

            if (strs.Length % 3 == 1) strs = "00" + strs;
            if (strs.Length % 3 == 2) strs = "0" + strs;
            string[] ahad = new string[11];
            ahad[0] = "واحد"; ahad[1] = "إثنان"; ahad[2] = "ثلاثة"; ahad[3] = "أربعة"; ahad[4] = "خمسة"; ahad[5] = "ستة";
            ahad[6] = "سبعة"; ahad[7] = "ثمانية"; ahad[8] = "تسعة"; ahad[9] = "إحدا"; ahad[10] = "إثنا";
            string[] acharat = new string[9];
            acharat[0] = "عشرة"; acharat[1] = "عشرون"; acharat[2] = "ثلاثون"; acharat[3] = "أربعون"; acharat[4] = "خمسون";
            acharat[5] = "ستون"; acharat[6] = "سبعون"; acharat[7] = "ثمانون"; acharat[8] = "تسعون";
            string[] miat = new string[2];
            miat[0] = "مائة"; miat[1] = "مائتين";
            string[,] amm = new string[3, 3];
            amm[0, 0] = "ألف"; amm[1, 0] = "ألفين"; amm[2, 0] = "آلاف";
            amm[0, 1] = "مليون"; amm[1, 1] = "مليونين"; amm[2, 1] = "ملايين";
            amm[0, 2] = "مليار"; amm[1, 2] = "ملياريين"; amm[2, 2] = "ملايير";
            /**************************/
            Int64 divm, divc, diva;
            int i, j = 0;
            if (strs.Length > 3) j = 1;
            if (strs.Length > 6) j = 2;
            if (strs.Length > 9) j = 3;
            for (i = 0; i < strs.Length; i = i + 3)
            {
                divm = Convert.ToInt64(strs.Substring(i, 3)) / 100;
                divc = (Convert.ToInt64(strs.Substring(i, 3)) - divm * 100) / 10;
                diva = Convert.ToInt64(strs.Substring(i, 3)) - (divm * 100) - (divc * 10);
                if (!(divm == 0 && divc == 0 && diva == 0))
                {
                    if (strd.Length > 0) strd = strd + " و ";
                    if (divm > 0)
                        if (divm == 1) strd = strd + miat[0];
                        else if (divm == 2) strd = strd + miat[1];
                        else if (divm == 8) strd = strd + ahad[divm - 1].Substring(0, ahad[divm - 1].Length - 2) + miat[0];
                        else strd = strd + ahad[divm - 1].Substring(0, ahad[divm - 1].Length - 1) + miat[0];
                    if (divm > 0 && (divc > 0 || diva > 0) && (!(divm == 0 && j > 0 && (diva == 1 || diva == 2)))) strd = strd + " و ";
                    if (diva == 0 && divc != 0) strd = strd + acharat[divc - 1];
                    if (diva != 0 && divc == 0) if (!(divm == 0 && j > 0 && (diva == 1 || diva == 2))) strd = strd + ahad[diva - 1];
                    if (diva != 0 && divc != 0)
                    {
                        if (divc == 1)
                        {
                            if (diva == 1) strd = strd + ahad[9] + acharat[divc - 1].Substring(0, acharat[divc - 1].Length - 1);
                            else if (diva == 2) strd = strd + ahad[10] + acharat[divc - 1].Substring(0, acharat[divc - 1].Length - 1);
                            else strd = strd + ahad[diva - 1] + acharat[divc - 1].Substring(0, acharat[divc - 1].Length - 1);
                        }
                        else strd = strd + ahad[diva - 1] + " و " + acharat[divc - 1];
                    }
                    if (j > 0)
                    {
                        if (divm == 0 && divc == 0)
                            if (diva == 1) strd = strd + " " + amm[0, j - 1];
                            else if (diva == 2) strd = strd + " " + amm[1, j - 1];
                            else strd = strd + " " + amm[2, j - 1];
                        else
                            if (divm == 0 && divc == 1 && diva == 0) strd = strd + " " + amm[2, j - 1];
                        else
                            strd = strd + " " + amm[0, j - 1];
                    }
                }
                j = j - 1;
            }

            return (strd + "  ريال قطري لا غير ");
        }

        //protected override  void OnInit(EventArgs e)
        //{
        //    String Database = String.Empty;
        //    String Server = String.Empty;
        //    String UserID = String.Empty;
        //    String Password = String.Empty;

        //    string reportPath = "~/Reports/" + Request.QueryString["ReportName"].ToString() + ".rpt";
        //    if (System.IO.File.Exists(this.Server.MapPath(reportPath)))
        //    {
        //        GetDatabaseValues(System.Configuration.ConfigurationManager.ConnectionStrings["Purchase"].ConnectionString, ref Database, ref Server, ref UserID, ref Password);
        //        ReportDocument rptDoc = new ReportDocument();

        //        CrystalDecisions.Web.CrystalReportSource source = new CrystalDecisions.Web.CrystalReportSource();
        //        source.Report = new CrystalDecisions.Web.Report() { FileName = this.Server.MapPath(reportPath) };
        //        ConnectionInfo c = new ConnectionInfo() { ServerName = Server, DatabaseName = Database, UserID = UserID, Password = Password };
        //        foreach (CrystalDecisions.CrystalReports.Engine.Table t in source.ReportDocument.Database.Tables)
        //        {
        //            TableLogOnInfo crTableLogOnInfo = t.LogOnInfo;
        //            crTableLogOnInfo.ConnectionInfo = c;
        //            t.ApplyLogOnInfo(crTableLogOnInfo);
        //        }
        //        source.ID = reportPath;
        //        rptDoc = source.ReportDocument;
        //        foreach (string key in Request.QueryString.Keys)
        //        {
        //            if (key == "ReportName") continue;
        //            else
        //                rptDoc.DataDefinition.FormulaFields[key].Text = Request.QueryString[key];
        //        }
        //        CrystalReportViewer.ReportSource = rptDoc;
        //    }
        //    base.OnInit(e);
        //}

    }
}