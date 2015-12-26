using Erp.BussinessLogic.Core;
using Erp.DataAccess.Common;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.BussinessLogic.Common
{
    public class UnitsLogic : IBaseLogic
    {

        private UnitsRepository _unitsRepository;

        public UnitsLogic()
        {
            _unitsRepository = new UnitsRepository();
        }
        public List<Units> GetUnits()
        {
            return _unitsRepository.GetAll().ToList<Units>();
        }


        public object GetUnits(int unitId)
        {
            Units units = _unitsRepository.Single(a => a.UnitId == unitId);

            if (units != null)
            {
                return new
                {
                    Units = new { data = units, total = 1 }
                };
            }
            else
            {
                return null;
            }
        }

        public List<Units> GetUnitFiltered(String query)
        {
            if (query != null)
            {
                return _unitsRepository.Find(a => a.Name.Contains(query))
                .OrderBy(a => a.UnitId)
                .Skip(0)
                .Take(25).ToList<Units>();
            }
            else
            {
                return _unitsRepository.GetAll().OrderBy(a => a.UnitId).Skip(0).Take(25).ToList<Units>();
            }


        }

        public Units AddorUpdate(Units units)
        {
            _unitsRepository.AddOrUpdate(units);
            _unitsRepository.SaveChanges();

            return units;
        }

        

        public void Dispose()
        {
            if (_unitsRepository != null)
                _unitsRepository.Dispose();
        }

    }
}
