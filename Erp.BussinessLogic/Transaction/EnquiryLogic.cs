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
    public class EnquiryLogic : IBaseLogic
    {
        private EnquiryMasterRepository _enquiryMasterRepository;

        public EnquiryLogic()
        {
            _enquiryMasterRepository = new EnquiryMasterRepository();
        }

        public List<EnquiryMaster> GetEnquiry()
        {

            return _enquiryMasterRepository.GetAll().ToList<EnquiryMaster>();
        }

        public Object GetEnquiryById(int enquiryId)
        {
            return  _enquiryMasterRepository
                .GetById(enquiryId);

        }

        public IEnumerable<EnquiryMaster> GetEnquiryFiltered(String query,int? start,int? limit)
        {

            if (query != null)
            {
                return _enquiryMasterRepository.GetFiltered(query);
            }
            else
            {
                return _enquiryMasterRepository.GetAll().OrderBy(a => a.EnquiryMasterId);
            }

        }
        public EnquiryMaster AddorUpdate(EnquiryMaster master)
        {
            _enquiryMasterRepository.AddOrUpdate(master);
            _enquiryMasterRepository.SaveChanges();
            return master;
        }

        public void Dispose()
        {
            if (_enquiryMasterRepository != null)
                _enquiryMasterRepository.Dispose();            
        }

    }

}
