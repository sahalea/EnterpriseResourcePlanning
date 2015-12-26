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
    public class PaymentMethodLogic : IBaseLogic
    {
        PaymentMethodRepository _paymentRepository;

        public PaymentMethodLogic()
        {
            _paymentRepository = new PaymentMethodRepository();
        }


        public List<PaymentMethod> GetPaymentMenthod()
        {
            return _paymentRepository.GetAll().ToList<PaymentMethod>();
        }
        public void Dispose()
        {
            if (_paymentRepository != null)
            {
                _paymentRepository.Dispose();
            }
        }
    }
}
