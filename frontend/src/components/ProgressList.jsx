import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const ProgressList = ({ userId, refresh }) => {
  const [entries, setEntries] = useState([]);
   const [searchDate, setSearchDate] = useState('');
    
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('http://localhost:3000/progress');
        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort oldest to newest
        setEntries(sorted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEntries();
  }, [userId, refresh]);

  
  const filteredweight = entries.filter((entry) =>
    entry.date.toLowerCase().includes(searchDate.toLowerCase())
  );
  return (
    <div style={styles.tableContainer}>
          
           <div style={styles.searchSection}>
        <TextField
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={styles.input}
        />
        
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>Date</th>
            <th style={styles.header}>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {filteredweight.length > 0 ? (
          filteredweight.map((entry) => (
            <tr key={entry._id}>
              <td style={styles.cell}>{new Date(entry.date).toLocaleDateString('en-GB')}</td>
              <td style={styles.cell}>{entry.weight}</td>
            </tr>
          )) ): (
            <p>no entries found</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    overflowX: 'auto',
    marginTop: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    backgroundColor: '#007acc',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontSize: '1rem',
  },
  cell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontSize: '0.95rem',
  },
};

export default ProgressList;