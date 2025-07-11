import React, { useState, useEffect, useContext } from 'react';
import { AppDataContext } from '../context/GlobalContext'; 

const FIELD_STATES = {
  harvested: { label: "Récolté", emoji: '🟩' },
  plowed: { label: "Labouré", emoji: '🔄' },
  sown: { label: "Semé", emoji: '🌱' },
  fertilized: { label: "Fertilisé", emoji: '💧' },
  ready: { label: "Prêt à récolter", emoji: '✅' },
};

const CROPS = [
  "Blé", "Orge", "Canola", "Tournesol", "Pomme de terre", "Olive",
  "Canne à sucre", "Betterave", "Coton", "Peuplier",
];

const machinesAvailable = {
  plow: 2,
  sow: 3,
  fertilize: 1,
  harvest: 2,
};

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function Fields() {
  const { fields, setFields } = useContext(AppDataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  // Fetch fields on component mount (or when setFields changes)
  useEffect(() => {
    async function fetchFields() {
      try {
        const res = await fetch('http://localhost:5000/fields');
        if (!res.ok) throw new Error('Erreur chargement champs');
        const data = await res.json();
        setFields(Array.isArray(data.fields) ? data.fields : []);
      } catch (error) {
        console.error(error);
        setFields([]); // fallback to empty array on error
      }
    }
    fetchFields();
  }, [setFields]);

  // Timer to decrement remaining time every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFields(fields =>
        fields.map(field => {
          if (field.remaining > 0) {
            const newRemaining = Math.max(0, field.remaining - 5);
            // Optional: update busy and state if needed here based on your logic
            return { ...field, remaining: newRemaining };
          }
          return field;
        })
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [setFields]);

  async function sendUpdate(id, updatedData) {
    try {
      const res = await fetch(`http://localhost:5000/fields/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        const errData = await res.json();
        console.error('API error:', errData.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi à l'API :", error);
    }
  }

  function releaseBusy(id) {
    setFields(fields => fields.map(f => f.id === id ? { ...f, busy: false } : f));
  }


  function handlePlow(id) {
    const newState = {
      state: 'plowed',
      remaining: 30,
      busy: true,
    };
    setFields(fields => fields.map(f => f.id === id ? { ...f, ...newState } : f));
    sendUpdate(id, newState);
    setTimeout(() => releaseBusy(id), 30000);
  }

  async function handleHarvest(id) {
    try {
      const response = await fetch(`http://localhost:5000/fields/${id}/harvest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (!response.ok) {
        alert(`Erreur: ${data.message}`);
        return;
      }

      const newState = {
        state: 'harvested',
        crop: null,
        remaining: 0,
        busy: false,
      };
      setFields(fields => fields.map(f => f.id === id ? { ...f, ...newState } : f));
      alert('Récolte envoyée au stockage avec succès');
    } catch (error) {
      alert('Erreur serveur ou réseau');
      console.error(error);
    }
  }

  function handleSowCrop(id, crop) {
    const newState = {
      state: 'sown',
      crop,
      remaining: 120,
      busy: true,
    };
    setFields(fields => fields.map(f => f.id === id ? { ...f, ...newState } : f));
    sendUpdate(id, newState);

    setTimeout(() => releaseBusy(id), 120000);
    setModalOpen(false);
    setSelectedField(null);
  }

  function handleFertilize(id) {
    const newState = {
      state: 'fertilized',
      busy: true,
      remaining: 30,
    };
    setFields(fields => fields.map(f => f.id === id ? { ...f, ...newState } : f));
    sendUpdate(id, newState);

    setTimeout(() => releaseBusy(id), 60000);
  }

  async function handleCreateField() {
    try {
      const res = await fetch('http://localhost:5000/fields', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Champ ${fields.length + 1}`,  
          state: 'harvested',
          crop_id: null,                      
          last_action_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(`Erreur création champ: ${errData.message}`);
        return;
      }
      const newField = await res.json();
      setFields(prev => Array.isArray(prev) ? [...prev, newField] : [newField]);
    } catch (error) {
      alert('Erreur serveur ou réseau');
      console.error(error);
    }
  }

  function CropModal() {
    if (!modalOpen || selectedField === null) return null;
    return (
      <div style={modalStyles.backdrop} role="dialog" aria-modal="true" tabIndex={-1}>
        <div style={modalStyles.modal}>
          <h3>Sélectionnez la culture pour le champ #{selectedField}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {CROPS.map(crop => (
              <li key={crop} style={{ margin: '8px 0' }}>
                <button
                  style={styles.modalButton}
                  onClick={() => handleSowCrop(selectedField, crop)}
                >
                  {crop}
                </button>
              </li>
            ))}
          </ul>
          <button
            style={styles.modalClose}
            onClick={() => { setModalOpen(false); setSelectedField(null); }}
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌾 Gérez vos champs</h1>
      <div style={styles.fieldGrid}>
        {Array.isArray(fields) && fields.length > 0 ? (
          fields.map(field => {
            const stateInfo = FIELD_STATES[field.state] || {};
            const canPlow = field.state === 'harvested' && machinesAvailable.plow > 0 && !field.busy;
            const canSow = field.state === 'plowed' && machinesAvailable.sow > 0 && !field.busy;
            const canFertilize =
              field.state === 'sown' &&
              field.remaining <= 0 &&
              machinesAvailable.fertilize > 0 &&
              !field.busy;
            const canHarvest =
              ((field.state === 'sown' && field.remaining <= 0) ||
                field.state === 'ready') &&
              machinesAvailable.harvest > 0 &&
              !field.busy;

            return (
              <div key={field.id} style={styles.fieldCard}>
                <div style={styles.fieldHeader}>
                  <strong>Champ {field.id}</strong>
                  <span>{stateInfo.emoji} {stateInfo.label}</span>
                </div>

                <div style={{ marginBottom: 6 }}>
                  Culture: {field.crop || '-'}
                </div>
                <div style={{ marginBottom: 12 }}>
                  Temps restants: {formatTime(field.remaining)}
                </div>

                <div style={styles.actionButtons}>
                  <button disabled={!canPlow} style={{ ...styles.actionButton, opacity: canPlow ? 1 : 0.4 }} onClick={() => handlePlow(field.id)}>Labourer</button>

                  <button disabled={!canSow} style={{ ...styles.actionButton, opacity: canSow ? 1 : 0.4 }} onClick={() => { setSelectedField(field.id); setModalOpen(true); }}>Semer</button>

                  <button disabled={!canFertilize} style={{ ...styles.actionButton, opacity: canFertilize ? 1 : 0.4 }} onClick={() => handleFertilize(field.id)}>Fertiliser</button>

                  <button disabled={!canHarvest} style={{ ...styles.actionButton, opacity: canHarvest ? 1 : 0.4 }} onClick={() => handleHarvest(field.id)}>Récolter</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Aucun champ disponible.</p>
        )}
      </div>




      <button style={{ ...styles.modalClose, marginTop: 30 }} onClick={handleCreateField}>+ Ajouter un champ</button>

      <CropModal />
    </div>
  );
}

const styles = {
  container: {
    padding: 24,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: '100vh',
    color: '#c0c0c0',
  },
  title: {
    color: '#81C784',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(350px,1fr))',
    gap: 25,
  },
  fieldCard: {
    backgroundColor: '#2C2F33',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 2px 8px rgba(129, 199, 132, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  fieldHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: 6,
    border: '1.5px solid 	rgba(211, 211, 211, 1)',
    backgroundColor: 'transparent',
    color: '	#d3d3d3',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
  modalButton: {
    width: '100%',
    padding: '10px',
    borderRadius: 6,
    border: '1.5px solid #00FFFF',
    backgroundColor: 'transparent',
    color: '#00FFFF',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
  modalClose: {
    marginTop: 12,
    padding: '8px 14px',
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#81C784',
    color: '#000',
    fontWeight: '700',
    cursor: 'pointer',
    alignSelf: 'center',
  },
};

const modalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modal: {
    backgroundColor: '#121212',
    padding: 24,
    borderRadius: 12,
    minWidth: 320,
    color: '#00FFFF',
    boxShadow: '0 0 20px #00FFFF',
  }
};
