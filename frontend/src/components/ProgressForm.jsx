import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const ProgressForm = ({ userId, onAdd }) => {
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateDate, setUpdateDate] = useState('');
  const [updateWeight, setUpdateWeight] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/progress', {
        userId,
        weight,
        date: date || new Date().toISOString(),
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
      onAdd(); 
    } catch (err) {
      console.error('Error deleting progress:', err);
    }
  };


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!updateWeight || !updateDate) {
      alert('Both weight and date are required for updating.');
      return;
    }

    try {
      await axios.patch('http://localhost:3000/progress', {
        userId,
        date: updateDate,
        weight: updateWeight,
      });
      setShowUpdateForm(false);
      setUpdateDate('');
      setUpdateWeight('');
      onAdd();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };



  return (
    <>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (kg)"
          style={styles.input}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <Button type="submit" style={styles.button}>Add</Button>
        <Button
          type="button"
          style={styles.button}
          onClick={() => setShowUpdateForm((prev) => !prev)}
        >
          {showUpdateForm ? 'Cancel' : 'Update'}
        </Button>
        <Button type="submit" style={styles.button} onClick={handleDelete}>Delete All</Button>

      </form>

      {showUpdateForm && (
        <form style={styles.updateForm} onSubmit={handleUpdateSubmit}>
          <input
            type="date"
            value={updateDate}
            onChange={(e) => setUpdateDate(e.target.value)}
            placeholder="Date to update"
            style={styles.input}
            required
          />
          <input
            type="number"
            value={updateWeight}
            onChange={(e) => setUpdateWeight(e.target.value)}
            placeholder="New weight"
            style={styles.input}
            required
          />
          <Button type="submit" style={styles.button}>Submit Update</Button>
        </form>
      )}

     
    </>
  );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  updateForm: {
    display: 'flex',
    gap: '10px',
    marginTop: '1rem',
    flexWrap: 'wrap',
    backgroundColor: '#f4f4f4',
    padding: '1rem',
    borderRadius: '8px',
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
    maxWidth: '140px',
  },
  searchSection: {
    marginTop: '2rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
  },
  result: {
    marginTop: '0.5rem',
    fontSize: '1rem',
    color: '#333',
  },
};

export default ProgressForm;
