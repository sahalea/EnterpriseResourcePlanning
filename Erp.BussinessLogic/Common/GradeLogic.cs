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
    public class GradeLogic : IBaseLogic
    {
        private GradeRepository _gradeRepository;

        public GradeLogic()
        {
            _gradeRepository = new GradeRepository();
        }

        public List<Grade> GetGrade()
        {
            return _gradeRepository.GetAll().ToList<Grade>();
        }
        
        public Object GetGradeById(int gradeId)
        {
            Grade grade = _gradeRepository.Single(a => a.GradeId == gradeId);

            if (grade != null)
            {
                return new
                {
                    Grade = new { data = grade, total = 1 }
                };
            }
            else
            {
                return null;
            }

        }


        public List<Grade> GetGradeFiltered(String query)
        {

            if (query != null)
            {
                return _gradeRepository.Find(a => a.Name.Contains(query))
                .OrderBy(a => a.GradeId)
                .Skip(0)
                .Take(25).ToList<Grade>();
            }
            else
            {
                return _gradeRepository.GetAll().OrderBy(a => a.GradeId).Skip(0).Take(25).ToList<Grade>();
            }


        }
        public Grade AddorUpdate(Grade grade)
        {
            _gradeRepository.AddOrUpdate(grade);
            _gradeRepository.SaveChanges();

            return grade;
        }

        public void Dispose()
        {
            if (_gradeRepository != null)
                _gradeRepository.Dispose();
        }

    }
}