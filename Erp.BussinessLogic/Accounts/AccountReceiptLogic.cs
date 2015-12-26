using Erp.BussinessLogic.Core;
using Erp.DataAccess.Accounts;
using Erp.DataAccess.Transaction;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Erp.BussinessLogic.Accounts
{
    public class AccountReceiptLogic : IBaseLogic
    {
        private AccountReceiptRepository _accountRepository;

        public AccountReceiptLogic()
        {
            _accountRepository = new AccountReceiptRepository();
        }

        public List<AccountReceiptMaster> GetAccountReceipt()
        {
            return _accountRepository.GetAll().ToList<AccountReceiptMaster>();
        }

        public AccountReceiptMaster AddorUpdate(AccountReceiptMaster master)
        {
            _accountRepository.AddOrUpdate(master);
            _accountRepository.SaveChanges();
            return master;
        }

        public void Dispose()
        {
            if (_accountRepository != null)
                _accountRepository.Dispose();
        }
    }
}
