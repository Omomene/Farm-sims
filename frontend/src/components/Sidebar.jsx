import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const styles = {
    sidebar: {
      width: '96px',
      backgroundColor: '#1e1e1e',
      color: '#c0c0c0',
      height: 'calc(100vh - 64px)',
      top: '64px',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 15px',
      paddingTop: '40px',
      boxSizing: 'border-box',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      userSelect: 'none',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      alignItems: 'center',
      flexGrow: 1,
      width: '100%',
    },
    link: {
      color: '#c0c0c0',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      padding: '6px 0',
    },
    activeLink: {
      color: '#81C784',
      backgroundColor: 'rgba(129, 199, 132, 0.2)',
    },
    label: {
      fontSize: '10px',
      fontWeight: '300',
      marginTop: '4px',
      userSelect: 'none',
      color: 'inherit',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    account: {
      paddingBottom: '16px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    button: {
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      color: '#c0c0c0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '56px',
      height: '56px',
      borderRadius: '12px',
      transition: 'background-color 0.3s',
    },
    icon: {
      width: '28px',
      height: '28px',
      fill: 'currentColor',
    },
  };

  const icons = {
    dashboard: (
      <svg style={styles.icon} viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
    fields: (
      <svg style={styles.icon} viewBox="0 0 24 24">
        <rect x="4" y="5" width="16" height="3" rx="1" />
        <rect x="4" y="10" width="16" height="3" rx="1" />
        <rect x="4" y="15" width="16" height="3" rx="1" />
      </svg>
    ),
    storage: (
      <svg style={styles.icon} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="4" rx="1" />
        <rect x="4" y="11" width="16" height="4" rx="1" />
        <rect x="4" y="18" width="16" height="4" rx="1" />
      </svg>
    ),
    factories: (
      <svg style={styles.icon} viewBox="0 0 24 24">
        <rect x="2" y="14" width="20" height="6" rx="1" />
        <rect x="6" y="7" width="12" height="7" rx="1" />
        <rect x="6" y="3" width="3" height="4" rx="1" />
      </svg>
    ),
    machines: (
      <svg style={styles.icon} viewBox="0 0 24 24">
        <rect x="10" y="2" width="4" height="12" rx="1" />
        <rect x="6" y="14" width="12" height="6" rx="1" />
      </svg>
    ),
    login: (
      <svg style={styles.icon} viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <rect x="6" y="14" width="12" height="6" rx="1" />
      </svg>
    ),
  };

  const navItems = [
    { path: '/', icon: icons.dashboard, label: 'Dashboard' },
    { path: '/fields', icon: icons.fields, label: 'Champs' },
    { path: '/storage', icon: icons.storage, label: 'Stokage' },
    { path: '/factories', icon: icons.factories, label: 'Usines' },
    { path: '/machines', icon: icons.machines, label: 'Machines' },
  ];

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        {navItems.map(({ path, icon, label }) => (
          <NavLink
            key={path}
            to={path}
            title={label}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            {icon}
            <span style={styles.label}>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div style={styles.account}>
        <button
          title="Log In"
          style={styles.button}
          onClick={() => alert('Login clicked!')}
          onMouseDown={e => e.preventDefault()}
          aria-label="Log In"
        >
          {icons.login}
          <span style={styles.label}>Log In</span>
        </button>
      </div>
    </aside>
  );
}
