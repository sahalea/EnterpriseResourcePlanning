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
    public class SalesOrderLogic : IBaseLogic
    {
        private SalesOrderMasterRepository _salesOrderMasterRepository;
      
        public SalesOrderLogic()
        {
            _salesOrderMasterRepository = new SalesOrderMasterRepository();
        }

        public List<SalesOrderMaster> GetSalesOrder()
        {

            return _salesOrderMasterRepository.GetAll().ToList<SalesOrderMaster>();
        }
        public Object GetSalesOrderById(int salesorderId)
        {
            return _salesOrderMasterRepository.GetById(salesorderId);
        }

        public List<SalesOrderMaster> GetSalesOrderFiltered(String query)
        {
            if (query != null)
            {
                return _salesOrderMasterRepository.GetFiltered(query).ToList<SalesOrderMaster>();
            }
            else
            {
                return _salesOrderMasterRepository.GetAll().OrderBy(a => a.SalesOrderMasterId).Skip(0).Take(25).ToList<SalesOrderMaster>();
            }

        }
        public SalesOrderMaster AddorUpdate(SalesOrderMaster master)
        {
            _salesOrderMasterRepository.AddOrUpdate(master);
            _salesOrderMasterRepository.SaveChanges();
            return master;
        }

        public void Dispose()
        {
            if (_salesOrderMasterRepository != null)
                _salesOrderMasterRepository.Dispose();
        }


    }
}
