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
    public class ItemSizeLogic : IBaseLogic
    {
        private ItemSizeRepository _itemSizeRepository;

        public ItemSizeLogic()
        {
            _itemSizeRepository = new ItemSizeRepository();
        }

        public List<ItemSize> GetItemSize()
        {
            return _itemSizeRepository.GetAll().ToList<ItemSize>();
        }
        
        public Object GetItemSizeById(int sizeId)
        {
            ItemSize itemSize = _itemSizeRepository.Single(a => a.ItemSizeId == sizeId);

            if (itemSize != null)
            {
                return new
                {
                    ItemSize = new { data = itemSize, total = 1 }
                };
            }
            else
            {
                return null;
            }

        }
        
        public List<ItemSize> GetItemSizeFiltered(String query)
        {

            if (query != null)
            {
                return _itemSizeRepository.Find(a => a.Name.Contains(query))
                .OrderBy(a => a.ItemSizeId)
                .Skip(0)
                .Take(25).ToList<ItemSize>();
            }
            else
            {
                return _itemSizeRepository.GetAll().OrderBy(a => a.ItemSizeId).Skip(0).Take(25).ToList<ItemSize>();
            }
        }
        public ItemSize AddorUpdate(ItemSize itemSize)
        {
            _itemSizeRepository.AddOrUpdate(itemSize);
            _itemSizeRepository.SaveChanges();

            return itemSize;
        }
        public void Dispose()
        {
            if (_itemSizeRepository != null)
                _itemSizeRepository.Dispose();
        }

    }
}