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
    public class DeliveryTermsLogic : IBaseLogic
    {

        public DeliveryTermsRepository _deliveryTermsRepository;

        public DeliveryTermsLogic()
        {
            _deliveryTermsRepository = new DeliveryTermsRepository();
        }
        public List<DeliveryTerms> GetDeliveryTerms()
        {
            return _deliveryTermsRepository.GetAll().ToList<DeliveryTerms>();
        }

        public object GetDeliveryTerms(int deliveryTermsId)
        {
            DeliveryTerms deliveryterms = _deliveryTermsRepository.Single(a => a.DeliveryTermId == deliveryTermsId);

            if (deliveryterms != null)
            {
                return new
                {
                    DelivaeryTerms = new { data = deliveryterms, total = 1 }
                };
            }
            else
            {
                return null;
            }
        }


        public DeliveryTerms AddorUpdate(DeliveryTerms deliveryTerms)
        {
            _deliveryTermsRepository.AddOrUpdate(deliveryTerms);
            _deliveryTermsRepository.SaveChanges();

            return deliveryTerms;
        }

        public void Dispose()
        {
            if (_deliveryTermsRepository != null)
                _deliveryTermsRepository.Dispose();
        }

    }
}
