import React, { useState } from 'react';
import ProgressForm from './components/ProgressForm';
import ProgressList from './components/ProgressList';

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const userId = '6622f0e6f9c3d88e2f5a3c9a';

  const handleAdd = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Fitness Progress Tracker</h1>
      <div style={styles.card}>
        <ProgressForm userId={userId} onAdd={handleAdd} />
        <h2 style={styles.subheading}>Progress History</h2>
        <ProgressList userId={userId} refresh={refresh} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#ffffffcc',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#003366',
  },
  subheading: {
    marginTop: '2rem',
    fontSize: '1.3rem',
    color: '#003366',
  }
};

export default App;