using Domain.Objetos;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositorio
{
    public class InventarioRepositorio
    {
        private readonly ApplicationDbContext _dbContext;
        public InventarioRepositorio(ApplicationDbContext context)
        {
            _dbContext = context;
        }
        public async Task<int> Create(Inventario inventario)
        {
            await _dbContext.Inventarios.AddAsync(inventario);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<int> Remove(int? id)
        {
            var entity = await _dbContext.Inventarios.FindAsync(id);
            _dbContext.Remove(entity);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Inventario>> GetAll()
        {
            return await _dbContext.Inventarios.Include(x => x.Producto).Include(x => x.Sucursal).ToListAsync();
        }
        public async Task<List<Inventario>> GetAllXD()
        {
            return await _dbContext.Inventarios.ToListAsync();
        }
        public async Task<int> Edit(Inventario inventario)
        {
            _dbContext.Inventarios.Update(inventario);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<Inventario> GetById(int id)
        {
            return await _dbContext.Inventarios.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
