// Totals.jsx
import React from 'react';

const Totals = ({ movimenti }) => {
  // Calcola il totale delle entrate e delle uscite
  const totali = movimenti.reduce(
    (acc, movimento) => {
      if (movimento.tipo === 'entrata') {
        acc.entrate += movimento.importo;
      } else if (movimento.tipo === 'uscita') {
        acc.uscite += movimento.importo;
      }
      return acc;
    },
    { entrate: 0, uscite: 0 }
  );

  return (
    <div>
      <h3>Totali Movimenti</h3>
      <p>Entrate Totali: {totali.entrate}€</p>
      <p>Uscite Totali: {totali.uscite}€</p>
    </div>
  );
};

export default Totals;



