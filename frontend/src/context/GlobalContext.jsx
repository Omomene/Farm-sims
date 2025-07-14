import React, { createContext, useState, useEffect } from 'react';

export const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [machines, setMachines] = useState([]);
  const [fields, setFields] = useState([]);
  const [factories, setFactories] = useState([]);
  const [storageItems, setStorageItems] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/machines')
      .then(res => res.json())
      .then(setMachines);
    fetch('http://localhost:5000/fields')
      .then(res => res.json())
      .then(setFields);
    fetch('http://localhost:5000/factories')
      .then(res => res.json())
      .then(setFactories);
    fetch('http://localhost:5000/storage')
      .then(res => res.json())
      .then(setStorageItems);
    fetch('http://localhost:5000/warehouse')   
      .then(res => res.json())
      .then(setWarehouses);
  }, []);

  return (
    <AppDataContext.Provider value={{ machines, fields, factories, storageItems, warehouses, setMachines, setFields, setFactories, setStorageItems, setWarehouses }}>
      {children}
    </AppDataContext.Provider>
  );
}
