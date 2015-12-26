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
   public class SalesExecutiveLogic : IBaseLogic
    {
        private SalesExecutiveRepository _salesExecutiveRepository;

        public SalesExecutiveLogic()
        {
            _salesExecutiveRepository = new SalesExecutiveRepository();
        }
        public List<SalesExecutive> GetSalesExecutives()
        {

            return _salesExecutiveRepository.GetAll().ToList<SalesExecutive>();
        }
        public Object GetSalesExecutiveById(int executiveId)
        {
            SalesExecutive salesExecutive = _salesExecutiveRepository.Single(a => a.ExecutiveId == executiveId);

            if (salesExecutive != null)
            {
                return new
                {
                    SalesExecutive = new { data = salesExecutive, total = 1 }
                };
            }
            else
            {
                return null;
            }

        }        
        public IEnumerable<SalesExecutive> GetSalesExecutiveFiltered(String query, int? start, int? limit)
        {
            if (query != null)
            {
                return _salesExecutiveRepository.Find(a => a.Name.Contains(query))
                .OrderBy(a => a.ExecutiveId).ToList<SalesExecutive>();
            }
            else
            {
                return _salesExecutiveRepository.GetAll().OrderBy(a => a.ExecutiveId).ToList<SalesExecutive>();
            }
        }
        public SalesExecutive AddorUpdate(SalesExecutive salesExecutive)
        {

            _salesExecutiveRepository.AddOrUpdate(salesExecutive);
            _salesExecutiveRepository.SaveChanges();

            return salesExecutive;
        }
        public void DeleteSalesExecutive(int id)
        {
            SalesExecutive _salesExecutive = _salesExecutiveRepository.GetById(id);
            _salesExecutiveRepository.Delete(_salesExecutive);
            _salesExecutiveRepository.SaveChanges();
        }
        public void Dispose()
        {

            if (_salesExecutiveRepository != null)
                _salesExecutiveRepository.Dispose();

        }

    }

}
