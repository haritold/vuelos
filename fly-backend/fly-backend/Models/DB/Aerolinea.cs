using System;
using System.Collections.Generic;

namespace fly_backend.Models.DB;

public partial class Aerolinea
{
    public int IdAerolinea { get; set; }

    public string Nombre { get; set; } = null!;

    public string Pais { get; set; } = null!;

    public string SitioWeb { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public virtual ICollection<Vuelo> Vuelos { get; set; } = new List<Vuelo>();
}
