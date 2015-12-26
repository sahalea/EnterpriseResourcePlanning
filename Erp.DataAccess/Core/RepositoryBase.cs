using Erp.DataAccess.Helper;
using Erp.DataMapping.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Erp.DataAccess.Core
{
    public class RepositoryBase<T> : IDisposable, IRepository<T> where T : class
    {
        protected readonly DbContext _context;

        public RepositoryBase(DbContext context)
        {
            _context = context;
        }

        public RepositoryBase()
        {
            _context = new ErpModel();
        }
        public IQueryable<T> Get
        {
            get { return _context.Set<T>(); }
        }
        public virtual IEnumerable<T> GetAll()
        {
            return _context.Set<T>().AsEnumerable<T>();
        }
        public virtual IEnumerable<T> Find(Func<T, bool> predicate)
        {
            if (predicate != null)
            {
                return _context.Set<T>().Where(predicate);
            }
            else
            {
                throw new ArgumentNullException("Predicate value must be passed to Find method");
            }
        }
        public virtual T Single(Func<T, bool> predicate)
        {
            if (predicate != null)
            {
                return _context.Set<T>().Where(predicate).SingleOrDefault<T>();
            }
            else
            {
                throw new ArgumentNullException("Predicate value must be passed to Single method");
            }
        }
        public virtual T First(Func<T, bool> predicate)
        {
            if (predicate != null)
            {
                return _context.Set<T>().Where(predicate).FirstOrDefault<T>();
            }
            else
            {
                throw new ArgumentNullException("Predicate value must be passed to First method");
            }
        }
        public virtual void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }
        public virtual void Update(T entity)
        {
            var entry = _context.Entry(entity);
            if (entry.State == EntityState.Detached)
            {
                _context.Set<T>().Attach(entity);
                entry = _context.Entry(entity);
            }
            entry.State = EntityState.Modified;
        }
        public virtual void AddOrUpdate(T entity)
        {
            DbContextExtensions.AddOrUpdate<T>(_context, entity);
        }
        public virtual void Delete(T stub)
        {
            _context.Set<T>().Remove(stub);
        }
        public virtual void SaveChanges()
        {
            _context.SaveChanges();
        }
        public virtual void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
