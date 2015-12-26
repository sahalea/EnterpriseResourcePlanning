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
    public class AccountTypeLogic : IBaseLogic
    {
        private AccountTypeRepository repository;

        public AccountTypeLogic()
        {
            repository = new AccountTypeRepository();
        }

        public List<AccountType> GetAccountType()
        {
            return repository.GetAll().ToList<AccountType>();
        }
        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
