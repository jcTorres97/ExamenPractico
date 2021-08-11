using Domain.Objetos;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositorio
{
    public class SucursalRepositorio
    {
        private readonly ApplicationDbContext _dbContext;
        public SucursalRepositorio(ApplicationDbContext context)
        {
            _dbContext = context;
        }
        public async Task<int> Create(Sucursal sucursal)
        {
            await _dbContext.Sucursales.AddAsync(sucursal);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<int> Remove(int? id)
        {
            var entity = await _dbContext.Sucursales.FindAsync(id);
            _dbContext.Remove(entity);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Sucursal>> GetAll()
        {
            return await _dbContext.Sucursales.ToListAsync();
        }
        public async Task<int> Edit(Sucursal sucursal)
        {
            _dbContext.Sucursales.Update(sucursal);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<Sucursal> GetById(int id)
        {
            return await _dbContext.Sucursales.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<bool> ExistsName(string name)
        {
            return await _dbContext.Sucursales.AnyAsync(x => x.Name.ToLower() == name.ToLower());
        }
        public async Task<bool> ExistsNameWithOtherId(string name, int id)
        {
            return await _dbContext.Sucursales.AnyAsync(x => x.Name.ToLower() == name.ToLower() && x.Id != id);
        }
    }
}
