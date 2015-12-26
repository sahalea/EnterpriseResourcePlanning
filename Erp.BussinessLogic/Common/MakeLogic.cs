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
    public class MakeLogic : IBaseLogic
    {
        private MakeRepository _makeRepository;

        public MakeLogic()
        {
            _makeRepository = new MakeRepository();
        }

        public List<Make> GetMake()
        {
            return _makeRepository.GetAll().ToList<Make>();
        }



        public Object GetMakeById(int makeId)
        {
            Make make = _makeRepository.Single(a => a.MakeId == makeId);

            if (make != null)
            {
                return new
                {
                    Make = new { data = make, total = 1 }
                };
            }
            else
            {
                return null;
            }

        }


        public List<Make> GetMakeFiltered(String query)
        {

            if (query != null)
            {
                return _makeRepository.Find(a => a.Name.Contains(query))
                .OrderBy(a => a.MakeId)
                .Skip(0)
                .Take(25).ToList<Make>();
            }
            else
            {
                return _makeRepository.GetAll().OrderBy(a => a.MakeId).Skip(0).Take(25).ToList<Make>();
            }


        }
        public Make AddorUpdate(Make make)
        {
            _makeRepository.AddOrUpdate(make);
            _makeRepository.SaveChanges();

            return make;
        }
        public void Dispose()
        {
            if (_makeRepository != null)
                _makeRepository.Dispose();
        }

    }
}