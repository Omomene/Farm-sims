import React, { useContext, useEffect, useState } from "react";
import { AppDataContext } from "../context/GlobalContext"; // adjust import path

export default function Factories() {
  const { factories, setFactories, storage, setStorage } = useContext(AppDataContext);
  const [loading, setLoading] = useState(true);
  // Track production timers per factory id
  const [productionTimers, setProductionTimers] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/factories")
      .then((res) => res.json())
      .then((data) => {
        setFactories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [setFactories]);

  // Called to start production on a factory
  const startProduction = (factory) => {
    if (productionTimers[factory.id]) return; // already producing

    const rateLps = 100; // rate liters per second
    const stockLiters = factory.stock;
    const seconds = Math.floor(stockLiters / rateLps);

    // Start countdown timer state for UI
    setProductionTimers((prev) => ({
      ...prev,
      [factory.id]: seconds,
    }));

    // Every second, update timer
    const intervalId = setInterval(() => {
      setProductionTimers((prev) => {
        const timeLeft = prev[factory.id];
        if (timeLeft <= 1) {
          clearInterval(intervalId);
          finishProduction(factory);
          // Remove timer
          const {[factory.id]: _, ...rest} = prev;
          return rest;
        }
        return { ...prev, [factory.id]: timeLeft - 1 };
      });
    }, 1000);
  };

  // Called when production finishes
  const finishProduction = (factory) => {
    const producedQuantity = factory.stock; // or any logic for quantity produced
    const newProduct = {
      id: Date.now(),
      item_name: factory.production,
      quantity: producedQuantity,
      item_type: "Produit final",
    };

    // Update storage: add or increment existing product quantity
    setStorage((prevStorage) => {
      const index = prevStorage.findIndex((item) => item.item_name === newProduct.item_name);
      if (index !== -1) {
        const updated = [...prevStorage];
        updated[index].quantity += newProduct.quantity;
        return updated;
      }
      return [...prevStorage, newProduct];
    });

    alert(`Production terminée pour ${factory.production}, quantité ajoutée au stockage !`);

    // Optionally reset factory stock here or update factories state
    setFactories((prevFactories) =>
      prevFactories.map((f) =>
        f.id === factory.id ? { ...f, stock: 0 } : f
      )
    );
  };

  if (loading) return <div>Chargement des usines...</div>;
  if (!factories.length) return <div>Aucune usine trouvée.</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏭 Gestion des Usines & Cultures</h1>

      <section>
        <div style={styles.cardContainer}>
          {factories.map((factory) => {
            const stockLiters = factory.stock;
            const seconds = Math.floor(stockLiters / 100);
            const timeRemaining = productionTimers[factory.id] !== undefined
              ? `${productionTimers[factory.id]} sec`
              : factory.time_remaining || `${seconds} sec`;

            const storageFull = factory.status_message?.toLowerCase().includes("plein");

            const canStartProduction = stockLiters > 100 && !storageFull && !productionTimers[factory.id];

            return (
              <div key={factory.id} style={styles.card}>
                <div style={styles.cardTitle}>{factory.name}</div>
                <div style={styles.infoLine}>
                  <strong>Ressource :</strong> {factory.resources}
                </div>
                <div style={styles.infoLine}>
                  Stock usine : {stockLiters} {factory.stock_unit}
                </div>
                <div style={styles.infoLine}>Production : {factory.production}</div>
                <div style={styles.infoLine}>Temps restant : {timeRemaining}</div>

                {storageFull && (
                  <div style={{ color: "#ff5555", fontWeight: "700" }}>
                    ⚠ {factory.status_message}
                  </div>
                )}

                <button
                  style={{
                    ...styles.button,
                    ...(canStartProduction ? {} : styles.buttonDisabled),
                  }}
                  disabled={!canStartProduction}
                  onClick={() => startProduction(factory)}
                >
                  {productionTimers[factory.id] ? "Production en cours..." : `Lancer la production de ${factory.production}`}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: 10,
    color: "#c0c0c0",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
  },
  title: {
    color: "#81C784",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 24,
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 30,
  },
  card: {
    backgroundColor: "#2C2F33",
    borderRadius: 12,
    padding: 20,
    width: 280,
    boxShadow: "0 2px 8px rgba(129, 199, 132, 0.4)",
  },
  cardTitle: {
    fontSize: 22,
    color: "#81C784",
    marginBottom: 12,
    fontWeight: "600",
  },
  infoLine: {
    fontSize: 14,
    marginBottom: 8,
  },
  status: {
    fontSize: 13,
    color: "#aaaaaa",
    marginBottom: 12,
  },
  button: {
    border: "1px solid #00FFFF",
    backgroundColor: "transparent",
    color: "#00FFFF",
    padding: "10px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    width: "100%",
    transition: "all 0.3s",
  },
  buttonDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};
