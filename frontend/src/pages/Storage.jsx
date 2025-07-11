import React, { useState, useEffect, useContext } from 'react';
import { AppDataContext } from '../context/GlobalContext';

export default function Storage() {
  const { storageItems, setStorageItems } = useContext(AppDataContext);
  const MAX_STORAGE = 100000;

  useEffect(() => {
    fetch('http://localhost:5000/storage')
      .then(res => res.json())
      .then(data => setStorageItems(data))
      .catch(console.error);
  }, []);

  const totalStorageUsed = storageItems.reduce((sum, item) => sum + item.quantity, 0);

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
    progressBar: { backgroundColor: '#81C784', height: '100%', width: `${(totalStorageUsed / MAX_STORAGE) * 100}%`, transition: 'width 0.3s ease' },
    progressText: { textAlign: 'center', marginTop: '8px', fontSize: '14px' },
  };

  const handleDelete = async (id, actionName) => {
    try {
      const res = await fetch(`http://localhost:5000/storage/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStorageItems(prev => prev.filter(item => item.id !== id));
        alert(`Élément ${actionName} !`);
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
      <h1 style={styles.title}>Aperçu du Stockage</h1>
      <p style={styles.subtitle}>Gérez votre inventaire et libérez de l'espace si nécessaire</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Article</th>
            <th style={styles.th}>Quantité (L)</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {storageItems.map(({ id, item_name, quantity, item_type }) => (
            <tr key={id}>
              <td style={styles.td}>{item_name}</td>
              <td style={styles.td}>{quantity.toLocaleString()}</td>
              <td style={styles.td}>{item_type}</td>
              <td style={styles.td}>
                <button style={styles.button} onClick={() => handleDelete(id, 'vendu')}>Vendre</button>
                <button
                  style={{ ...styles.button, ...styles.discardButton }}
                  onClick={() => handleDelete(id, 'supprimé')}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.progressBarContainer}>
        <div style={styles.progressBar}></div>
      </div>
      <p style={styles.progressText}>
        {totalStorageUsed.toLocaleString()}L / {MAX_STORAGE.toLocaleString()}L utilisés
      </p>
    </div>
  );
}
