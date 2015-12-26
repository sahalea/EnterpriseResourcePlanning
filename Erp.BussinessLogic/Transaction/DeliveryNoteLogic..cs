using Erp.BussinessLogic.Core;
using Erp.DataAccess.Transaction;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.BussinessLogic.Transaction
{
    public class DeliveryNoteLogic : IBaseLogic
    {
        private DeliveryNoteMasterRepository _deliveryNoteMasterRepository;
       
        public DeliveryNoteLogic()
        {
            _deliveryNoteMasterRepository = new DeliveryNoteMasterRepository();
        }

        public List<DeliveryNoteMaster> GetDeliveryNote()
        {

            return _deliveryNoteMasterRepository.GetAll().ToList<DeliveryNoteMaster>();
        }

        public Object GetDeliveryNoteById(int deliveryId)
        {
            return _deliveryNoteMasterRepository.GetById(deliveryId);
        }

        public List<DeliveryNoteMaster> GetDeliveryFiltered(String query)
        {
            if (query != null)
            {
                return _deliveryNoteMasterRepository.GetFiltered(query).ToList<DeliveryNoteMaster>();
            }
            else
            {
                return _deliveryNoteMasterRepository.GetAll().OrderBy(a => a.DeliveryNoteMasterId).Skip(0).Take(25).ToList<DeliveryNoteMaster>();
            }
        }
        public DeliveryNoteMaster AddorUpdate(DeliveryNoteMaster master)
        {
            _deliveryNoteMasterRepository.AddOrUpdate(master);
            _deliveryNoteMasterRepository.SaveChanges();
            return master;
        }

        public void Dispose()
        {
            if (_deliveryNoteMasterRepository != null)
                _deliveryNoteMasterRepository.Dispose();
        }

    }

}
