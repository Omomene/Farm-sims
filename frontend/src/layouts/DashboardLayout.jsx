import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  const styles = {
    layout: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
    },
    mainContainer: {
      flex: 1,
      display: 'flex',
      width: '100%',
      overflow: 'hidden',
    },
    content: {
      flexGrow: 1,
      padding: '24px',
      backgroundColor: '#212529',
      color: '#e0e0e0',
      overflowY: 'auto',
    },
  };

  return (
    <div style={styles.layout}>
      <Header />
      <div style={styles.mainContainer}>
        <Sidebar />
        <main style={styles.content}>
          <Outlet /> {/* <-- This renders nested routes */}
        </main>
      </div>
    </div>
  );
}
