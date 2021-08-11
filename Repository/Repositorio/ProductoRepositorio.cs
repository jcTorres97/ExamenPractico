using Domain.Objetos;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositorio
{
    public class ProductoRepositorio
    {
        private readonly ApplicationDbContext _dbContext;
        public ProductoRepositorio(ApplicationDbContext context)
        {
            _dbContext = context;
        }
        public async Task<int> Create(Producto producto)
        {
            await _dbContext.Productos.AddAsync(producto);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<int> Remove(int? id)
        {
            var entity = await _dbContext.Productos.FindAsync(id);
            _dbContext.Remove(entity);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Producto>> GetAll()
        {
            return await _dbContext.Productos.ToListAsync();
        }
        public async Task<int> Edit(Producto producto)
        {
            _dbContext.Productos.Update(producto);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<Producto> GetById(int id)
        {
            return await _dbContext.Productos.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<bool> ExistsName(string name)
        {
            return await _dbContext.Productos.AnyAsync(x => x.Name.ToLower() == name.ToLower());
        }
        public async Task<bool> ExistsNameWithOtherId(string name, int id)
        {
            return await _dbContext.Productos.AnyAsync(x => x.Name.ToLower() == name.ToLower() && x.Id != id);
        }
    }
}
