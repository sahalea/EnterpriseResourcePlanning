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
    public class CountryLogic : IBaseLogic
    {
        public CountryRepository _countryRepository;

        public CountryLogic()
        {
            _countryRepository = new CountryRepository();
        }
        public List<Country> GetCountry(String query, int start, int limit, out int totalCount)
        {

            IEnumerable<Country> list = null;

            if (query != null)
            {
                list = _countryRepository.GetAll()
                   .Where(x => x.Name.Contains(query));
            }
            else
            {
                list = _countryRepository.GetAll();
            }
            totalCount = list.Count();

            return list.OrderBy(x => x.CountryId).Skip(start).Take(limit).ToList<Country>();
        }

        public object GetCountry(int countryId)
        {
            Country country = _countryRepository.Single(a => a.CountryId == countryId);

            if (country != null)
            {
                return new
                {
                    Country = new { data = country, total = 1 }
                };
            }
            else
            {
                return null;
            }
        }

        public Country AddorUpdate(Country country)
        {
            _countryRepository.AddOrUpdate(country);
            _countryRepository.SaveChanges();

            return country;
        }

        public void Dispose()
        {
            if (_countryRepository != null)
                _countryRepository.Dispose();
        }

    }
}
