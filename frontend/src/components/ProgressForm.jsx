import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button'

const ProgressForm = ({ userId, onAdd }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    
    try {
      await axios.post('http://localhost:3000/progress', {
        userId,
        weight,
        date: date || new Date().toISOString(), // fallback to current date
      });
      setWeight('');
      setDate('');
      onAdd();
    } catch (err) {
      console.error('Error submitting progress:', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete all progress?")) return;
    try {
      await axios.delete('http://localhost:3000/progress');
      onAdd(); // Optionally refresh the list if needed
    } catch (err) {
      console.error('Error deleting progress:', err);
    }
  };
  



  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight (kg)"
        //required
        style={styles.input}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        //required
        style={styles.input}
      />
      <Button type="submit" style={styles.button} >Add</Button>
      <Button type="submit" style={styles.button} onClick={handleDelete}>Delete All</Button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1 1 45%',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minWidth: '140px',
  },
  button: {
    backgroundColor: '#007acc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    flex: '1 1 100%',
    maxWidth: '100px',
  }
};

export default ProgressForm;