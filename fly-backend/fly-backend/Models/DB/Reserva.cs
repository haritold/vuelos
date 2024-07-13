using System;
using System.Collections.Generic;

namespace fly_backend.Models.DB;

public partial class Reserva
{
    public int IdReserva { get; set; }

    public int IdVuelo { get; set; }

    public int IdUsuario { get; set; }

    public DateTime Fecha { get; set; }

    public int Asiento { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;

    public virtual Vuelo IdVueloNavigation { get; set; } = null!;
}
