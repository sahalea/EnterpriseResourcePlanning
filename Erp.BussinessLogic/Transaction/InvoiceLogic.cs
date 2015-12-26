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
    public class InvoiceLogic : IBaseLogic
    {
        private InvoiceMasterRepository _invoiceMasterRepository;

        public InvoiceLogic()
        {
            _invoiceMasterRepository = new InvoiceMasterRepository();
        }
        public List<InvoiceMaster> GetInvoice()
        {
            return _invoiceMasterRepository.GetAll().ToList<InvoiceMaster>();
        }

        public Object GetInvoiceById(int invoiceId)
        {
            return _invoiceMasterRepository
                .GetById(invoiceId);
        }
        public List<InvoiceMaster> GetInvoiceByCustomerId(int customerId)
        {
            return _invoiceMasterRepository
                .GetInvoiceByCustomerId(customerId).ToList<InvoiceMaster>();
        }
        public List<InvoiceMaster> GetInvoiceFiltered(String query)
        {
            if (query != null)
            {
                return _invoiceMasterRepository.GetFiltered(query).ToList<InvoiceMaster>();
            }
            else
            {
                return _invoiceMasterRepository.GetAll().OrderBy(a => a.InvoiceMasterId)
                    .Skip(0).Take(25).ToList<InvoiceMaster>();
            }
        }

        public InvoiceMaster AddorUpdate(InvoiceMaster master)
        {
            _invoiceMasterRepository.AddOrUpdate(master);
            _invoiceMasterRepository.SaveChanges();
            return master;
        }
        public void Dispose()
        {
            if (_invoiceMasterRepository != null)
                _invoiceMasterRepository.Dispose();
        }
    }
}