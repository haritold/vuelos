using System;
using System.Collections.Generic;

namespace fly_backend.Models.DB;

public partial class Vuelo
{
    public int IdVuelo { get; set; }

    public int IdAerolinea { get; set; }

    public string Origen { get; set; } = null!;

    public string Destino { get; set; } = null!;

    public DateTime FechaSalida { get; set; }

    public DateTime FechaLlegada { get; set; }

    public decimal Precio { get; set; }

    public virtual Aerolinea? IdAerolineaNavigation { get; set; } = null!;

    public virtual ICollection<Reserva>? Reservas { get; set; } = new List<Reserva>();
}
