// App.jsx



/*
// Componente per aggiungere un nuovo movimento
const AggiungiMovimento = ({ onAdd }) => {
  const [tipo, setTipo] = useState('');
  const [importo, setImporto] = useState('');
  const [data, setData] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!tipo || !importo || !data) {
      alert('Per favore inserisci tutti i campi');
      return;
    }
    onAdd({ tipo, importo: Number(importo), data: new Date(data) });
    setTipo('');
    setImporto('');
    setData('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Tipo di movimento"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Importo"
        value={importo}
        onChange={(e) => setImporto(e.target.value)}
      />
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit">Aggiungi Movimento</button>
    </form>
  );
};

// Componente per visualizzare i movimenti
const ListaMovimenti = ({ movimenti }) => {
  // Ordina i movimenti per data
  const movimentiOrdinati = [...movimenti].sort((a, b) => new Date(a.data) - new Date(b.data));

  return (
    <div>
      {movimentiOrdinati.map((movimento) => (
        <div key={movimento.id}>
          <p>Tipo: {movimento.tipo}</p>
          <p>Importo: {movimento.importo}€</p>
          <p>Data: {new Date(movimento.data).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [movimenti, setMovimenti] = useState([]);

  const aggiungiMovimento = (movimento) => {
    setMovimenti((prevMovimenti) => [
      ...prevMovimenti,
      { ...movimento, id: Math.random().toString() },
    ]);
  };

  // Calcola i totali
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

  const saldoTotale = totali.entrate - totali.uscite;

  return (
    <div>
      <h1>Gestione Saldo Spese</h1>
      <AggiungiMovimento onAdd={aggiungiMovimento} />
      <ListaMovimenti movimenti={movimenti} />
      <div>
        <h3>Saldo Totale</h3>
        <p>Entrate Totali: {totali.entrate}€</p>
        <p>Uscite Totali: {totali.uscite}€</p>
        <p>Saldo: {saldoTotale}€</p>
      </div>
    </div>
  );
};

export default App;
*/








import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('spesa');
  const [description, setDescription] = useState('');

  const handleAddTransaction = () => {
    const newTransaction = {
      date,
      amount: type === 'spesa' ? -Math.abs(amount) : Math.abs(amount),
      type,
      description,
    };
    setTransactions([...transactions, newTransaction]);
    setDate('');
    setAmount('');
    setDescription('');
  };

  const getTotal = () => transactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
  const getIncome = () => transactions.filter(t => t.amount > 0).reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
  const getExpense = () => transactions.filter(t => t.amount < 0).reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  return (
    <div>
      <h2>MY WALLET</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="spesa">Spesa</option>
        <option value="incasso">Incasso</option>
      </select>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrizione" />
      <button onClick={handleAddTransaction}>Aggiungi</button>
      <h3>Transazioni</h3>
      {transactions.map((transaction, index) => (
        <div key={index}>
          <p>Data: {transaction.date}</p>
          <p>Tipo: {transaction.type}</p>
          <p>Importo: {transaction.amount}</p>
          <p>Descrizione: {transaction.description}</p>
        </div>
      ))}
      <h3>Totale: {getTotal()}</h3>
      <h3>Entrate: {getIncome()}</h3>
      <h3>Uscite: {getExpense()}</h3>
    </div>
  );
};

export default App;
