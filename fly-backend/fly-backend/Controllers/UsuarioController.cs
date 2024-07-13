using fly_backend.Models.DB;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace fly_backend.Controllers
{
    [Route("api/v1.0.0/[controller]")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class UsuarioController : ControllerBase
    {
        private readonly DesarrolloContext _context;
        public UsuarioController(DesarrolloContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("")]
        public dynamic listarUsuarios()
        {
            var usuarios = _context.Usuarios;
            return usuarios;
        }
        // GET: api/<UsuarioController>
        [HttpPost]
        [Route("login")]
        public dynamic Get(string correo, string password)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.Correo == correo && u.Password == password);
            return usuario != null ? Ok(usuario) : NotFound(new {mensaje = "No se encontró el usuario"});
        }

        // GET api/<UsuarioController>/5
        [HttpGet("{id}")]
        public dynamic Get(int id)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.IdUsuario==id);
            return usuario != null ? Ok(usuario) : NotFound(new { mensaje = "No se encontró el usuario" });
        }
        /*
        // POST api/<UsuarioController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UsuarioController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsuarioController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
