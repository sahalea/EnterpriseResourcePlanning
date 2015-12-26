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
   public class ProjectLogic : IBaseLogic
    {
        private ProjectRepository _projectRepository;

        public ProjectLogic()
        {
            _projectRepository = new ProjectRepository();
        }

        public List<Projects> GetProjects()
        {

            return _projectRepository.GetAll().ToList<Projects>();
        }
        public Object GetProjectById(int projectId)
        {
            Projects project = _projectRepository.Single(a => a.ProjectId == projectId);
            
            if (project != null)
            {
                return new
                {
                    Projects = new { data = project, total = 1 }
                };
            }
            else
            {
                return null;
            }

        }
        public IEnumerable<Projects> GetProjectFiltered(String query,int? start, int? limit)
        {
            if (query != null)
            {
                return _projectRepository.GetFiltered(query);
            }
            else
            {
                return _projectRepository.GetAll().OrderBy(a => a.ProjectId).ToList<Projects>();
            }
        }
        public Projects AddorUpdate(Projects projects)
        {
            _projectRepository.AddOrUpdate(projects);
            _projectRepository.SaveChanges();

            return projects;
        }
        public void DeleteProject(int id)
        {
            Projects _project = _projectRepository.GetById(id);
            _projectRepository.Delete(_project);
            _projectRepository.SaveChanges();
        }
        public void Dispose()
        {
            if (_projectRepository != null)
                _projectRepository.Dispose();
        }
    }
}
