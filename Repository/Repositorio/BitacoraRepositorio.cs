using Domain.Objetos;
using Microsoft.EntityFrameworkCore;
using Repository.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositorio
{
    public class BitacoraRepositorio
    {
        private readonly ApplicationDbContext _dbContext;
        public BitacoraRepositorio(ApplicationDbContext context)
        {
            _dbContext = context;
        }
        public async Task<int> Create(Bitacora bitacora)
        {
            await _dbContext.Bitacoras.AddAsync(bitacora);
            return await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Bitacora>> GetAll()
        {
            return await _dbContext.Bitacoras.ToListAsync();
        }
    }
}
