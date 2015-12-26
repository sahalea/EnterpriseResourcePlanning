using Erp.BussinessLogic.Core;
using Erp.DataAccess.Sales;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.BussinessLogic.Sales
{
    public class DailyCustomerVisitLogic : IBaseLogic
    {

        private DailyCustomerVisitRepositiory _customerVisitRepository;

        public DailyCustomerVisitLogic()
        {
            _customerVisitRepository = new DailyCustomerVisitRepositiory();
        }

        public List<DailyCustomerVisit> GetCustomerVisit()
        {

            return _customerVisitRepository.GetAll().ToList<DailyCustomerVisit>();
        }
        public Object GetCustomerVisitById(int customerVisitId)
        {
            DailyCustomerVisit customerVisit = _customerVisitRepository.Single(a => a.CustomerVisitId == customerVisitId);

            return customerVisit;
        }
        public IEnumerable<DailyCustomerVisit> GetCustomerVisitFiltered(String query,int? start,int? limit)
         {
             if (query != null)
             {
                return _customerVisitRepository.GetFiltered(query);

            }
            else
             {
                 return _customerVisitRepository.GetAll().OrderBy(a => a.CustomerVisitId);
             }
         }
        public DailyCustomerVisit AddorUpdate(DailyCustomerVisit customervisit)
        {

            _customerVisitRepository.AddOrUpdate(customervisit);
            _customerVisitRepository.SaveChanges();


            return customervisit;
        }

        public void DeleteCustomerVisit(int id)
        {
            DailyCustomerVisit _customerVisit = _customerVisitRepository.GetById(id);
            _customerVisitRepository.Delete(_customerVisit);
            _customerVisitRepository.SaveChanges();
        }

        public void Dispose()
        {

            if (_customerVisitRepository != null)
                _customerVisitRepository.Dispose();

        }

    }

}