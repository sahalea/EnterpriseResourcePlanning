using Erp.DataAccess.Core;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Transaction
{
    public class DeliveryNoteMasterRepository : RepositoryBase<DeliveryNoteMaster>
    {
        public override IEnumerable<DeliveryNoteMaster> GetAll()
        {
            return _context.Set<DeliveryNoteMaster>()
                .Include("SalesOrderMaster")
                .Include("SalesOrderMaster.Customers")
                .Include("SalesOrderMaster.CustomerContacts")
                .Include("SalesOrderMaster.Projects")
                .Include("SalesOrderMaster.SalesExecutive")
                .Include("DeliveryNoteDetails")
                .Include("DeliveryNoteDetails.Material")
                .Include("DeliveryNoteDetails.Product")
                .Include("DeliveryNoteDetails.ItemSize")
                .Include("DeliveryNoteDetails.Make")
                .Include("DeliveryNoteDetails.Grade")
                .Include("DeliveryNoteDetails.Units")
                .Include("SalesOrderMaster.SalesOrderDetails")
                .Include("SalesOrderMaster.SalesOrderDetails.Material")
                .Include("SalesOrderMaster.SalesOrderDetails.Product")
                .Include("SalesOrderMaster.SalesOrderDetails.ItemSize")
                .Include("SalesOrderMaster.SalesOrderDetails.Make")
                .Include("SalesOrderMaster.SalesOrderDetails.Grade")
                .Include("SalesOrderMaster.SalesOrderDetails.Units")
                .AsEnumerable<DeliveryNoteMaster>();
        }


        public DeliveryNoteMaster GetById(int id)
        {
            return _context.Set<DeliveryNoteMaster>()
                .Include("SalesOrderMaster")
                .Include("SalesOrderMaster.Customers")
                .Include("SalesOrderMaster.CustomerContacts")
                .Include("SalesOrderMaster.Projects")
                .Include("SalesOrderMaster.SalesExecutive")
                .Include("DeliveryNoteDetails")
                .Include("DeliveryNoteDetails.Material")
                .Include("DeliveryNoteDetails.Product")
                .Include("DeliveryNoteDetails.ItemSize")
                .Include("DeliveryNoteDetails.Make")
                .Include("DeliveryNoteDetails.Grade")
                .Include("DeliveryNoteDetails.Units")
                .Include("SalesOrderMaster.SalesOrderDetails")
                .Include("SalesOrderMaster.SalesOrderDetails.Material")
                .Include("SalesOrderMaster.SalesOrderDetails.Product")
                .Include("SalesOrderMaster.SalesOrderDetails.ItemSize")
                .Include("SalesOrderMaster.SalesOrderDetails.Make")
                .Include("SalesOrderMaster.SalesOrderDetails.Grade")
                .Include("SalesOrderMaster.SalesOrderDetails.Units")
                .Where(a => a.DeliveryNoteMasterId == id)
                .FirstOrDefault<DeliveryNoteMaster>();
        }

        public IEnumerable<DeliveryNoteMaster> GetFiltered(string query)
        {
            return _context.Set<DeliveryNoteMaster>()
               .Include("SalesOrderMaster")
                .Include("SalesOrderMaster.Customers")
                .Include("SalesOrderMaster.CustomerContacts")
                .Include("SalesOrderMaster.Projects")
                .Include("SalesOrderMaster.SalesExecutive")
                .Include("DeliveryNoteDetails")
                .Include("DeliveryNoteDetails.Material")
                .Include("DeliveryNoteDetails.Product")
                .Include("DeliveryNoteDetails.ItemSize")
                .Include("DeliveryNoteDetails.Make")
                .Include("DeliveryNoteDetails.Grade")
                .Include("DeliveryNoteDetails.Units")
                .Include("SalesOrderMaster.SalesOrderDetails")
                .Include("SalesOrderMaster.SalesOrderDetails.Material")
                .Include("SalesOrderMaster.SalesOrderDetails.Product")
                .Include("SalesOrderMaster.SalesOrderDetails.ItemSize")
                .Include("SalesOrderMaster.SalesOrderDetails.Make")
                .Include("SalesOrderMaster.SalesOrderDetails.Grade")
                .Include("SalesOrderMaster.SalesOrderDetails.Units")
                .Where(a => a.DeliveryNoteNumber.Contains(query))
                .OrderBy(a => a.DeliveryNoteMasterId)
                .Skip(0)
                .Take(25).ToList<DeliveryNoteMaster>();
        }

    }
}
