export default function Header() {
  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      backgroundColor: '#1e1e1e',
      padding: '10px 24px',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    farm: {
      color: '#81C784', 
      fontWeight: '600',
      fontSize: '30px',
      marginRight: '8px',
    },
    sims: {
      color: '#e0e0e0',
      fontFamily: 'Georgia, serif',
      fontWeight: '400',
      fontSize: '30px',
      letterSpacing: '1px',
      paddingTop:'3px',
    },
  };

  return (
    <header style={styles.header}>
      <span style={styles.farm}>Farmstead</span>
      <span style={styles.sims}>Sims</span>
    </header>
  );
}
