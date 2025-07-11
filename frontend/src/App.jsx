import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Fields from './pages/Fields';
import Machines  from './pages/Machines';
import Factories  from './pages/Factories';
import Storage  from './pages/Storage';
import { AppDataProvider } from './context/GlobalContext';

function App() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <Routes>
          {/* DashboardLayout wraps these pages */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />         {/* path="/" */}
            <Route path="fields" element={<Fields />} />
            <Route path="storage" element={<Storage />} />
            <Route path="factories" element={<Factories />} />
            <Route path="machines" element={<Machines />} />
          </Route>
          {/* other routes if needed */}
        </Routes>
      </BrowserRouter>
    </AppDataProvider>
  );
}

export default App;

