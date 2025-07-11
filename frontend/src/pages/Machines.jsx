import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Machines() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleReserve = (id) => {
    setMachines((prev) =>
      prev.map((machine) =>
        machine.id === id
          ? {
              ...machine,
              available: !machine.available,
              assignedTo: !machine.available ? null : `Champ ${Math.floor(Math.random() * 99) + 1}`,
              nextAvailable: !machine.available ? null : 'dans 5 min',
            }
          : machine
      )
    );
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/machines')
      .then((res) => {
        setMachines(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des machines :', err);
        setLoading(false);
      });
  }, []);

  const styles = {
    container: {
      padding: '24px',
      color: '#e0e0e0',
    },
    title: {
      fontSize: '32px',
      color: '#81C784',
      fontWeight: '700',
      marginBottom: '20px',
    },
    card: {
      backgroundColor: '#2C2F33',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(129, 199, 132, 0.2)',
      border: '1px solid rgba(173, 216, 230, 0.3)',
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    info: {
      flex: 1,
      minWidth: '200px',
    },
    label: {
      fontSize: '14px',
      color: '#7f7f7f',
    },
    value: {
      fontSize: '17px',
      fontWeight: '400',
      color: '#e1e1e1',
    },
    button: {
      padding: '10px 18px',
      border: '1px solid rgba(173, 216, 230, 0.5)',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      color: '#d3d3d3',
      cursor: 'pointer',
      transition: 'all 0.3s',
      minWidth: '130px',
    },
    buttonActive: {
      backgroundColor: '#81C784',
      color: '#121212',
    },
  };

  if (loading) return <div style={styles.container}>Chargement des machines...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Aperçu des Machines</h1>

      {machines.map((machine) => (
        <div key={machine.id} style={styles.card}>
          <div style={styles.info}>
            <div><span style={styles.label}>Nom :</span> <span style={styles.value}>{machine.name}</span></div>
            <div><span style={styles.label}>Type :</span> <span style={styles.value}>{machine.type}</span></div>
            <div><span style={styles.label}>Statut :</span> <span style={styles.value}>{machine.available ? '✅ Disponible' : '🔄 En cours d’utilisation'}</span></div>
            <div><span style={styles.label}>Assigné à :</span> <span style={styles.value}>{machine.assigned_to || '—'}</span></div>
            <div><span style={styles.label}>Prochaine disponibilité :</span> <span style={styles.value}>{machine.next_available ? new Date(machine.next_available).toLocaleString() : 'Maintenant'}</span></div>
          </div>

          <button
            onClick={() => toggleReserve(machine.id)}
            style={{
              ...styles.button,
              ...(machine.available ? {} : styles.buttonActive),
            }}
          >
            {machine.available ? 'Réserver' : 'Libérer'}
          </button>
        </div>
      ))}
    </div>
  );
}
