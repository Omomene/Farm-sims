import React, { useEffect, useContext } from 'react';
import { AppDataContext } from '../context/GlobalContext';

export default function Warehouse() {
  const { warehouses, setWarehouses } = useContext(AppDataContext);

  useEffect(() => {
    fetch('http://localhost:5000/warehouse')
      .then(res => res.json())
      .then(data => setWarehouses(data))
      .catch(console.error);
  }, []);

  const styles = {
    container: { padding: '24px', color: '#c0c0c0' },
    title: { color: '#81C784', fontSize: '28px', marginBottom: '12px' },
    subtitle: { color: '#7f7f7f', fontSize: '16px', marginBottom: '20px' },
    table: { width: '100%', borderCollapse: 'collapse', marginBottom: '24px' },
    th: { borderBottom: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'left', padding: '12px', color: '#81C784', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' },
    td: { padding: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' },
    button: { marginRight: '8px', border: '1px solid #00FFFF', backgroundColor: 'transparent', color: '#00FFFF', padding: '6px 12px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' },
    discardButton: { border: '1px solid #FF6666', color: '#FF6666' },
    progressBarContainer: { backgroundColor: '#2C2F33', borderRadius: '6px', height: '24px', overflow: 'hidden' },
  };

  const handleDelete = async (id, actionName) => {
    try {
      const res = await fetch(`http://localhost:5000/warehouse/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setWarehouses(prev => prev.filter(wh => wh.id !== id));
        alert(`Entrepôt ${actionName} !`);
      } else {
        alert('Erreur lors de la suppression.');
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestion des Entrepôts</h1>
      <p style={styles.subtitle}>Stockage uniquement des produits transformés. Visualisez la capacité et la charge actuelle de chaque entrepôt.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nom</th>
            <th style={styles.th}>Capacité (L)</th>
            <th style={styles.th}>Charge actuelle (L)</th>
            <th style={styles.th}>Type autorisé</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses?.map(({ id, name, capacity_liters, current_load_liters, allowed_type }) => {
            const loadPercent = (current_load_liters / capacity_liters) * 100;
            return (
              <tr key={id}>
                <td style={styles.td}>{name}</td>
                <td style={styles.td}>{capacity_liters.toLocaleString()}</td>
                <td style={styles.td}>{current_load_liters.toLocaleString()}</td>
                <td style={styles.td}>{allowed_type}</td>
                <td style={styles.td}>
                  <button style={styles.button} onClick={() => handleDelete(id, 'supprimé')}>
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {warehouses?.map(({ id, current_load_liters, capacity_liters }) => {
        const percent = (current_load_liters / capacity_liters) * 100;
        return (
          <div key={id} style={{ marginBottom: '20px' }}>
            <div style={styles.progressBarContainer}>
              <div
                style={{
                  height: '24px',
                  width: `${percent}%`,
                  backgroundColor: percent > 80 ? '#FF6666' : '#81C784',
                  borderRadius: '6px',
                  transition: 'width 0.3s ease',
                }}
              ></div>
            </div>
            <p style={{ color: '#c0c0c0', fontSize: '14px', marginTop: '6px' }}>
              Entrepôt {id} : {current_load_liters.toLocaleString()}L / {capacity_liters.toLocaleString()}L ({percent.toFixed(1)}%)
            </p>
          </div>
        );
      })}
    </div>
  );
}
