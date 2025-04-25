import React, { useState, useEffect } from 'react';
import { getPlans } from '../api';
import {
  Select, MenuItem, FormControl,
  Card, CardContent, Typography, Button, CircularProgress,
  Chip, CardMedia, Box, Paper, Modal, IconButton
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const typeFilters = ['Workout', 'Diet', 'Supplement'];
const categoryTabs = ['Muscle Gain', 'Weight Loss', 'General Fitness'];
const ITEMS_PER_PAGE = 6;

const PlansDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [previousSelectedType, setPreviousSelectedType] = useState(''); // Add previous selected type state
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = async () => {
    if (!selectedCategory || !selectedType) return;
    setLoading(true);
    try {
      const data = await getPlans(selectedCategory, selectedType);
      setPlans(data);
      setVisibleCount(ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
    setLoading(false);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'Workout': return <FitnessCenterIcon />;
      case 'Diet': return <RestaurantIcon />;
      case 'Supplement': return <LocalPharmacyIcon />;
      default: return null;
    }
  };

  useEffect(() => {
    if (selectedCategory && selectedType) {
      handleSearch();
    }
  }, [selectedCategory, selectedType]);

  // Reset chip on category change, but maintain selectedType until chip is selected
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedType(''); // Reset the selectedType when category changes
    setPreviousSelectedType(selectedType); // Store the previous type before reset
  };

  const handleChipClick = (type) => {
    setSelectedType(type);
  };

  return (
    <Box sx={{ p: 2, maxWidth: '1100px', mx: 'auto', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontFamily: `'Anton', sans-serif`, fontWeight: 700, fontSize: '2.8rem', color: 'white', textShadow: '2px 2px 6px rgba(0,0,0,0.6)', mt: 4, mb: 3 }}
      >
        FITNESS PLANS
      </Typography>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)', color: 'white' }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5">Select Your Fitness Goal And Plan Type:</Typography>
        </Box>

        <Box
  sx={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    mb: 3,
    flexWrap: 'wrap',
  }}
>
  {/* Dropdown */}
  <FormControl sx={{ minWidth: 350}}>
    <Select
      value={selectedCategory}
      onChange={handleCategoryChange}
      displayEmpty
      sx={{
        letterSpacing:'2.5px',
        borderRadius:'8px',
        px:4,
        border:'2.5px solid white',
        textAlign:'center',
        fontSize:'18.5px',
        color: 'white',
        '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        svg: { color: 'white' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        bgcolor: 'rgba(255,255,255,0.05)',
      }}
    >
      <MenuItem value="" disabled>Category</MenuItem>
      {categoryTabs.map((category) => (
        <MenuItem key={category} value={category}>{category}</MenuItem>
      ))}
    </Select>
  </FormControl>

  {/* Chips Box */}
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '13.5px 10px',
      borderRadius: '14px',
      border: '3px solid white',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      justifyContent: 'center',
      maxWidth: 'fit-content',
    }}
  >
    {typeFilters.map((label) => (
      <Chip
        key={label}
        label={label}
        icon={getIconForType(label)}
        clickable
        onClick={() => handleChipClick(label)}
        variant={selectedType === label ? 'filled' : 'outlined'}
        sx={{
          color: 'white',
          borderColor: 'white',
          backgroundColor: selectedType === label ? '#1976d2' : 'transparent',
          '&:hover': {
            backgroundColor:
              selectedType === label ? '#1565c0' : 'rgba(255, 255, 255, 0.1)',
          },
        }}
      />
    ))}
  </Box>
</Box>


        <Box sx={{ mt: 4 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : plans.length === 0 ? (
            <Typography align="center" color="white" sx={{ mt: 6, fontStyle: 'italic' }}>
              No plans available for this selection.
            </Typography>
          ) : (
            <>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
                {plans.slice(0, visibleCount).map((plan) => (
                  <motion.div key={plan._id} whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
                    <Card onClick={() => handleOpenModal(plan)} sx={{ bgcolor: '#000', color: 'white', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
                      {plan.image && (
                        <CardMedia component="img" height="220" image={plan.image} alt={plan.name} />
                      )}
                      <CardContent>
                        <Chip label={plan.type} color="primary" size="small" icon={getIconForType(plan.type)} sx={{ mb: 1 }} />
                        <Typography variant="h6" align="center" gutterBottom>{plan.name}</Typography>
                        <Typography variant="body2" align="center" sx={{ mb: 1 }}>{plan.description}</Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>

              {visibleCount < plans.length && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button variant="outlined" onClick={handleShowMore} sx={{ color: 'white', borderColor: 'white' }}>
                    Show More
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#111', color: 'white', p: 4, borderRadius: 2, width: '90%', maxWidth: 500 }}>
            <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}>
              <CloseIcon />
            </IconButton>
            {selectedPlan && (
              <>
                {selectedPlan.image && <CardMedia component="img" height="200" image={selectedPlan.image} alt={selectedPlan.name} sx={{ mb: 2 }} />}
                <Typography variant="h5" gutterBottom>{selectedPlan.name}</Typography>
                <Typography variant="body1" gutterBottom>{selectedPlan.description}</Typography>
                {selectedPlan.features && selectedPlan.features.length > 0 && (
                  <Box component="ul" sx={{ pl: 2, mt: 2 }}>
                    {selectedPlan.features.map((feature, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <CheckCircleIcon sx={{ fontSize: 18, color: '#2196f3', mr: 1 }} />
                        <Typography variant="body2" sx={{ color: '#ccc' }}>{feature}</Typography>
                      </li>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Modal>
      </Paper>
    </Box>
  );
};

export default PlansDisplay;
