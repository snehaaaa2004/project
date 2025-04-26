import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, FormControl, Chip, Box, Paper, Typography, Button, CircularProgress } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

const typeFilters = ['Workout', 'Diet', 'Supplement'];
const categoryTabs = ['Muscle Gain', 'Weight Gain', 'Weight Loss', 'General Fitness'];

const PlansDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!selectedCategory || !selectedType) return;

    setLoading(true);
    setTimeout(() => {
      navigate(`/plans?category=${selectedCategory}&type=${selectedType}`);
    }, 800); // slight delay to show spinner
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'Workout': return <FitnessCenterIcon />;
      case 'Diet': return <RestaurantIcon />;
      case 'Supplement': return <LocalPharmacyIcon />;
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: '1100px', mx: 'auto', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: `'Anton', sans-serif`, fontWeight: 700, fontSize: '2.8rem', color: 'white' }}>
        FITNESS PLANS
      </Typography>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(0, 0, 0, 0.6)', color: 'white' }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5">Select Your Fitness Goal And Plan Type:</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          {/* Dropdown for Category */}
          <FormControl sx={{ minWidth: 350 }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              sx={{ color: 'white', borderColor: 'white', borderRadius: '8px', bgcolor: 'rgba(255,255,255,0.05)' }}
            >
              <MenuItem value="" disabled>Category</MenuItem>
              {categoryTabs.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Chips for Type */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {typeFilters.map((label) => (
              <Chip
                key={label}
                label={label}
                icon={getIconForType(label)}
                clickable
                onClick={() => setSelectedType(label)}
                variant={selectedType === label ? 'filled' : 'outlined'}
                sx={{
                  color: 'white',
                  backgroundColor: selectedType === label ? '#1976d2' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Search Button */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSearch}
            color={selectedCategory && selectedType ? 'primary' : 'inherit'}
            disabled={!selectedCategory || !selectedType || loading}
            sx={{
              minWidth: 120,
              bgcolor: selectedCategory && selectedType ? 'primary.main' : 'grey.500',
              color: 'white',
              '&:hover': {
                bgcolor: selectedCategory && selectedType ? 'primary.dark' : 'grey.600',
              },
              '&.Mui-disabled': {
                bgcolor: 'grey.500',
                color: 'white',
              },
            }}
          >
          Search
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PlansDisplay;
