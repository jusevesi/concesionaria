let autos = require('./autos.js');

let concesionaria = {
   autos: autos,
   buscarAuto: function (patente) {
      let autoFil = autos.filter(function (auto) {
         return auto.patente == patente;
      });
      if (autoFil.length > 0) {
         return autoFil[0];
      } else {
         return null;
      }
   },
   venderAuto: function (patente) {
      let auto = this.buscarAuto(patente)
      auto.vendido = true;
      return auto
   },
   autosParaLaVenta: function () {
      let autosVenta = autos.filter(function (auto) {
         return auto.vendido === false;
      })
      return autosVenta;

   },
   autosNuevos: function () {
      let autosVenta = this.autosParaLaVenta()
      let autoKm = autosVenta.filter(function (auto) {
         return auto.km <= 100;
      })
      return autoKm;
   },
   listaDeVentas: function () {
      let autosVendidos = autos.filter(function (auto) {
         return auto.vendido === true;
      })
      let autoPrecio = autosVendidos.map(function (auto) {
         return auto.precio;
      })
      return autoPrecio;
   },
   totalDeVentas: function () {
      let precios = this.listaDeVentas()
      if (precios.length > 0) {
         let total = precios.reduce(function (acum, precio) {
            return acum + precio;
         })
         return total;
      } else {
         return 0;
      }
   },
   puedeComprar: function (auto, persona) {
      let valorCuota = auto.precio / auto.cuotas;
      if (auto.precio <= persona.capacidadDePagoTotal && valorCuota <= persona.capacidadDePagoEnCuotas) {
         return true;
      } else {
         return false;
      }
   },
   autosQuePuedeComprar: function (persona) {
      let autosVenta = this.autosParaLaVenta();
      let functionComprar = this.puedeComprar;
      let autosComprar = autosVenta.filter(function (auto) {
         return functionComprar(auto, persona);
      })
      return autosComprar;
   }
};


let persona = {
   nombre: 'Juan',
   capacidadDePagoEnCuotas: 200000,
   capacidadDePagoTotal: 5000000
}

console.log(concesionaria.autosQuePuedeComprar(persona));