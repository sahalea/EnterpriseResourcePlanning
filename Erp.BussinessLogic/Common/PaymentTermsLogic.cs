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
    public class PaymentTermsLogic : IBaseLogic
    {
        PaymentTermsRepository _paymentRepository;

        public PaymentTermsLogic()
        {
            _paymentRepository = new PaymentTermsRepository();
        }

        public List<PaymentTerms> GetPaymentTerms()
        {
            return _paymentRepository.GetAll().ToList<PaymentTerms>();
        }


        public List<PaymentTerms> GetPaymentFiltered(String query)
        {

            if (query != null)
            {
                return _paymentRepository.Find(a => a.Name.Contains(query))
                .OrderBy(a => a.PaymentTermsId)
                .Skip(0)
                .Take(25).ToList<PaymentTerms>();
            }
            else
            {
                return _paymentRepository.GetAll().OrderBy(a => a.PaymentTermsId).Skip(0).Take(25).ToList<PaymentTerms>();
            }


        }

        public object getPaymentTerms(int paymentTermsId)
        {
            PaymentTerms paymentTerms = _paymentRepository.Single(a => a.PaymentTermsId == paymentTermsId);

            if (paymentTerms != null)
            {
                return new
                {
                    PaymentTerms = new { data = paymentTerms , total = 1 }
                };
            }
            else
            {
                return null;
            }
        }

        public PaymentTerms AddorUpdate(PaymentTerms paymentTerms)
        {
            _paymentRepository.AddOrUpdate(paymentTerms);
            _paymentRepository.SaveChanges();

            return paymentTerms;
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
