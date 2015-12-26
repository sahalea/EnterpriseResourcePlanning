using Erp.BussinessLogic.Core;
using Erp.DataAccess.Transaction;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Erp.BussinessLogic.Transaction
{
    public class QuotationLogic : IBaseLogic
    {
        private QuotationMasterRepository _quotationMasterRepository;

        public QuotationLogic()
        {
            _quotationMasterRepository = new QuotationMasterRepository();
        }

        public List<QuotationMaster> GetQuotation()
        {
            return _quotationMasterRepository.GetAll().ToList<QuotationMaster>();
        }

        public Object GetQuotationById(int quotationId)
        {
            return _quotationMasterRepository.GetById(quotationId);
        }

        public List<QuotationMaster> GetQuotationByCustomerId(int customerId)
        {
            return _quotationMasterRepository.GetAll().Where(a => a.CustomerId == customerId).ToList<QuotationMaster>();
        }

        public IEnumerable<QuotationMaster> GetQuotationFiltered(String query, int? start, int? limit)
        {

            if (query != null)
            {
                return _quotationMasterRepository.GetFiltered(query);
            }
            else
            {
                return _quotationMasterRepository.GetAll().OrderBy(a => a.QuotationMasterId);
            }
        }
        public QuotationMaster AddorUpdate(QuotationMaster master)
        {
            _quotationMasterRepository.AddOrUpdate(master);
            _quotationMasterRepository.SaveChanges();
            return master;
        }

        public void Dispose()
        {
            if (_quotationMasterRepository != null)
                _quotationMasterRepository.Dispose();
        }
    }
}
