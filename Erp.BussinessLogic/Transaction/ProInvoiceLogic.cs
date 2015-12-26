using Erp.BussinessLogic.Core;
using Erp.DataAccess.Transaction;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Erp.BussinessLogic.Transaction
{
    public class ProInvoiceLogic : IBaseLogic
    {
        private ProFormaInvoiceMasterRepository _proInvoiceMasterRepository;

        public ProInvoiceLogic()
        {
            _proInvoiceMasterRepository = new ProFormaInvoiceMasterRepository();
        }

        public List<ProFormaInvoiceMaster> GetInvoice()
        {

            return _proInvoiceMasterRepository.GetAll().ToList<ProFormaInvoiceMaster>();
        }
        public Object GetInvoiceById(int invoiceId)
        {
            return _proInvoiceMasterRepository.GetById(invoiceId);
        }

        public List<ProFormaInvoiceMaster> GetInvoiceFiltered(String query)
        {
            if (query != null)
            {
                return _proInvoiceMasterRepository.GetFiltered(query).ToList<ProFormaInvoiceMaster>();
            }
            else
            {
                return _proInvoiceMasterRepository.GetAll().OrderBy(a => a.ProInvoiceMasterId).ToList<ProFormaInvoiceMaster>();
            }

        }
        public ProFormaInvoiceMaster AddorUpdate(ProFormaInvoiceMaster master)
        {
            _proInvoiceMasterRepository.AddOrUpdate(master);
            _proInvoiceMasterRepository.SaveChanges();
            return master;
        }

        public void Dispose()
        {
            if (_proInvoiceMasterRepository != null)
                _proInvoiceMasterRepository.Dispose();
        }

    }
}
