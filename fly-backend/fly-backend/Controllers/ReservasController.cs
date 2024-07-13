using fly_backend.Models.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace fly_backend.Controllers
{
    [ApiController]
    [Route("api/v1.0.0/[controller]")]
    public class ReservasController : ControllerBase
    {
        private readonly DesarrolloContext _context;

        public ReservasController(DesarrolloContext context)
        {
            _context = context;
        }

        // GET: api/<ReservasController>
        [HttpGet]
        public async Task<List<Reserva>> Get(int usuario, int? vuelo)
        {
            var query = _context.Reservas.AsQueryable();

            query = query.Where(v => v.IdUsuario == usuario);

            if (vuelo != null)
            {
                query = query.Where(v => v.IdVuelo == vuelo);
            }

            return await query.ToListAsync();
        }

        // GET api/<ReservasController>/5
        [HttpGet("{id}")]
        public dynamic Get(int id)
        {
            var reserva = _context.Reservas.FirstOrDefault(u => u.IdReserva == id);
            return reserva != null ? Ok(reserva) : NotFound(new { mensaje = "No se encontró la reserva" });
        }

        // POST api/<ReservasController>
        [HttpPost]
        public dynamic Post(int usuario, int vuelo)
        {
            var usuarioAsignado = _context.Usuarios.FirstOrDefault(u => u.IdUsuario == usuario);
            var vueloAsignado = _context.Vuelos.FirstOrDefault(u => u.IdVuelo == vuelo);

            if (usuarioAsignado != null && vueloAsignado != null)
            {
                Reserva reserva = new Reserva
                {
                    IdUsuario = usuarioAsignado.IdUsuario,
                    IdVuelo = vueloAsignado.IdVuelo,
                };
                _context.Reservas.Add(reserva);
                var nuevo = _context.SaveChangesAsync().Result;
                return nuevo;
            }
            return BadRequest(new { mensaje = "No se encontró el usuario o el vuelo asignado" });
        }

        // GET api/<ReservasController>/5
        [HttpGet("estadisticas")]
        public async Task<List<AerolineaConReservas>> Get()
        {
            var aerolineasConMasReservas = _context.Aerolineas
            .Select(a => new AerolineaConReservas
            {
                Aerolinea = a.Nombre,
                TotalReservas = a.Vuelos.SelectMany(v => v.Reservas).Count()
            })
            .OrderByDescending(a => a.TotalReservas)
            .ToListAsync(); 

            return await aerolineasConMasReservas;
            
        }

        // GET api/<ReservasController>/5
        [HttpGet("estadisticas/total")]
        public async Task<int> ObtenerNumeroTotalAerolineasAsync()
        {
            return await _context.Aerolineas.Distinct().CountAsync();
        }
    }
    public class AerolineaConReservas
    {
        public string? Aerolinea { get; set; }
        public int TotalReservas { get; set; }
    }
}
