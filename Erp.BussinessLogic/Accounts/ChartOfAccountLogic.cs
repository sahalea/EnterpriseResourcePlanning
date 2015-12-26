using Erp.BussinessLogic.Core;
using Erp.DataAccess.Accounts;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Erp.BussinessLogic.Accounts
{
    public class ChartOfAccountLogic : IBaseLogic
    {
        private ChartOfAccountRepository _accountRepository;

        public ChartOfAccountLogic()
        {
            _accountRepository = new ChartOfAccountRepository();
        }
        public List<ChartsOfAccount> GetChartOfAccount()
        {

            return _accountRepository.GetAll().ToList<ChartsOfAccount>();
        }

        public object GetChartOfAccountById(int accountId)
        {
            return _accountRepository.GetById(accountId);
        }
        public IEnumerable<ChartsOfAccount> GetChartOfAccountFiltered(string query,int? start, int? limit)
        {
            if (query != null)
            {
                return _accountRepository.GetFiltered(query);
            }
            else
            {
                return _accountRepository.GetAll().OrderBy(a => a.ChartsAccountId);    
            }
        }
        public ChartsOfAccount AddorUpdate(ChartsOfAccount account)
        {
            _accountRepository.AddOrUpdate(account);
            _accountRepository.SaveChanges();
            return account;
        }
        public void Dispose()
        {
            if (_accountRepository != null)
                _accountRepository.Dispose();
        }
    }
}
