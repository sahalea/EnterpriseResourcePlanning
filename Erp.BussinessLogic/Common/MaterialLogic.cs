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
    public class MaterialLogic : IBaseLogic
    {
        private MaterialRepository _materialRepository;

        public MaterialLogic()
        {
            _materialRepository = new MaterialRepository();
        }

        public List<Material> GetMaterial()
        {
            return _materialRepository.GetAll().ToList<Material>();
        }



        public Object GetMaterialById(int materialId)
        {
            Material material = _materialRepository.Single(a => a.MaterialId == materialId);

            if (material != null)
            {
                return new
                {
                    Material = new { data = material, total = 1 }
                };
            }
            else
            {
                return null;
            }

        }
        public List<Material> GetMaterialFiltered(String query)
        {
            if (query != null)
            {
                return _materialRepository.Find(a => a.Name.Contains(query))
                .OrderBy(a => a.MaterialId)
                .Skip(0)
                .Take(25).ToList<Material>();
            }
            else
            {
                return _materialRepository.GetAll().OrderBy(a => a.MaterialId).Skip(0).Take(25).ToList<Material>();
            }
        }
        public Material AddorUpdate(Material material)
        {
            _materialRepository.AddOrUpdate(material);
            _materialRepository.SaveChanges();

            return material;
        }

        public void Dispose()
        {
            if (_materialRepository != null)
                _materialRepository.Dispose();
        }

    }
}