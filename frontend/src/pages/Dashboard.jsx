import React from 'react';
import { useContext } from 'react';
import { AppDataContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const styles = {
    container: {
      padding: '24px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: '100vh',
      color: '#c0c0c0',
    },
    title: {
      color: '#81C784',
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px',
    },
    subtitle: {
      color: '#7f7f7f',
      fontSize: '18px',
      marginBottom: '24px',
    },
    cardContainer: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      marginBottom: '36px',
    },
    card: {
      backgroundColor: '#2C2F33',
      flex: '1 1 200px',
      minWidth: '200px',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      color: '#fff',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      marginBottom: '8px',
    },
    cardValue: {
      color: '#81C784',
      fontSize: '36px',
      fontWeight: '700',
    },
    buttonContainer: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    button: {
      border: '1.5px solid rgba(211, 211, 211, 1)',
      backgroundColor: 'transparent',
      color: '#d3d3d3',
      padding: '14px 28px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      minWidth: '200px',
      transition: 'background-color 0.3s, color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#81C784',
      color: '#121212',
    },
  };

  const navigate = useNavigate();
  const { fields, machines, storageItems } = useContext(AppDataContext);
  const totalFields = fields.length;
  const availableMachines = machines.length;
  const MAX_STORAGE = 100000;
  const totalStorageUsed = storageItems.reduce((sum, item) => sum + item.quantity, 0);
  const storageUsedPercent = Math.min(100, Math.floor((totalStorageUsed / MAX_STORAGE) * 100));
  
  const goldEarned = 12345;

  const buttons = [
    { id: 'fields', label: 'Voir les champs', path: '/fields' },
    { id: 'machines', label: 'Voir les machines', path: '/machines' },
    { id: 'storage', label: 'Voir le stockage', path: '/storage' },
  ];
  const [hoveredButton, setHoveredButton] = React.useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenue</h1>
      <p style={styles.subtitle}>Commencez à gérer votre ferme virtuelle efficacement</p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Champs Totaux</div>
          <div style={styles.cardValue}>{totalFields}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Machines Disponibles</div>
          <div style={styles.cardValue}>{availableMachines}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Stock Utilisé</div>
          <div style={styles.cardValue}>{storageUsedPercent}%</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>Or Gagné</div>
          <div style={styles.cardValue}>💰 {goldEarned.toLocaleString()}</div>
        </div>
      </div>
      <div style={styles.buttonContainer}>
        {[
          { id: 'runDay', label: 'Lancer les opérations agricoles', path: '/fields' },
          { id: 'newSim', label: 'Démarrer une production', path: '/factories' },
          { id: 'sellItems', label: 'Vendre des articles du stock', path: '/storage' },
        ].map(({ id, label, path }) => (
          <button
            key={id}
            style={{
              ...styles.button,
              ...(hoveredButton === id ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoveredButton(id)}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigate(path)}  // Navigate on click
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
