using fly_backend.Models.DB;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json.Serialization;
using System.Text.Json;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace fly_backend.Controllers
{
    [Route("api/v1.0.0/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class VuelosController : ControllerBase
    {
        private readonly DesarrolloContext _context;

        public VuelosController(DesarrolloContext context)
        {
            _context = context;
        }

        // GET: api/<VuelosController>
        [HttpGet]
        public dynamic Get(string? origen, string? destino, DateTime? fechaSalida, DateTime? fechaLlegada)
        {
            var query = _context.Vuelos.AsQueryable();

            if (!string.IsNullOrEmpty(origen))
            {
                query = query.Where(v => v.Origen == origen);
            }

            if (!string.IsNullOrEmpty(destino))
            {
                query = query.Where(v => v.Destino == destino);
            }
            if (fechaSalida.HasValue)
            {
                query = query.Where(v => v.FechaSalida >= fechaSalida);
            }
            if (fechaLlegada.HasValue)
            {
                query = query.Where(v => v.FechaLlegada <= fechaLlegada);
            }

            var vuelos = query.Include(v=>v.IdAerolineaNavigation)/*.Select(v => new
            {
                IdAerolinea = v.IdAerolinea,
                IdVuelo = v.IdVuelo,
                Aerolinea = v.IdAerolineaNavigation.Nombre,
                fechaSalida = v.FechaSalida,
                fechaLlegada = v.FechaLlegada,
                precio = v.Precio,

            })*/.ToListAsync();
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
            };
            var vuelosJson = JsonSerializer.Serialize(vuelos.Result, options);

            return vuelosJson != null ? Ok(vuelosJson) : NotFound(new { mensaje = "No se encontró el vuelo" });
        }

        // GET api/<VuelosController>/5
        [HttpGet("{id}")]
        public dynamic Get(int id)
        {
            var vuelo = _context.Vuelos.FirstOrDefault(u => u.IdVuelo == id);
            return vuelo != null ? Ok(vuelo) : NotFound(new { mensaje = "No se encontró el vuelo" });
        }

        // POST api/<VuelosController>
        [HttpPost]
        public dynamic Post([FromBody] Vuelo vuelo)
        {
            if (vuelo == null)
            {
                return BadRequest(new { mensaje = "Datos de vuelo inválidos" });
            }

            _context.Vuelos.Add(vuelo);
            _context.SaveChangesAsync();
            return Ok("Vuelo registrado exitosamente");
        }
        /*
        // PUT api/<VuelosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<VuelosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
