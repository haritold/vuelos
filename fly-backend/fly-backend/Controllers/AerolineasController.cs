using fly_backend.Models.DB;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace fly_backend.Controllers
{
    [Route("api/v1.0.0/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class AerolineasController : ControllerBase
    {
        private readonly DesarrolloContext _context;
        public AerolineasController(DesarrolloContext context)
        {
            _context = context;
        }

        // GET: api/<AerolineasController>
        [HttpGet]
        public dynamic Get()
        {
            var aerolineas = _context.Aerolineas;
            return aerolineas;
        }

        // GET api/<AerolineasController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AerolineasController>
        [HttpPost]
        public dynamic PostAerolinea(Aerolinea aerolinea)
        {
        _context.Aerolineas.Add(aerolinea);
        var aero = _context.SaveChangesAsync().Result;
        return aero;
    }
        /*
// PUT api/<AerolineasController>/5
[HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AerolineasController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/

        [HttpGet("estadisticas")]
        public dynamic estadisticas()
        {
            var aerolineasConMasReservas = _context.Aerolineas
            .Select(a => new AerolineaConReservas
            {
                Aerolinea = a.Nombre,
                TotalReservas = a.Vuelos.SelectMany(v => v.Reservas).Count()
            })
            .OrderByDescending(a => a.TotalReservas)
            .ToListAsync();

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
            };
            var reservasJson = JsonSerializer.Serialize(aerolineasConMasReservas.Result, options);
            return reservasJson != null ? Ok(reservasJson) : NotFound(new { mensaje = "No se encontró el vuelo" });
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
