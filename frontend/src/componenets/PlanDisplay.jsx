import React, { useState, useEffect } from 'react';
import { getPlans } from '../api';
import {
  Select, MenuItem, FormControl, InputLabel, 
  Card, CardContent, Typography, Button, CircularProgress, 
  Chip, CardMedia, Box, List, ListItem, ListItemIcon, ListItemText, 
  useMediaQuery, Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const typeFiltersWithIcons = [
  { label: 'Workout', icon: <FitnessCenterIcon fontSize="small" /> },
  { label: 'Diet', icon: <RestaurantIcon fontSize="small" /> },
  { label: 'Supplement', icon: <LocalPharmacyIcon fontSize="small" /> },
];

const categoryTabs = ['Muscle Gain', 'Weight Loss', 'General Fitness'];
const ITEMS_PER_PAGE = 6;

const PlansDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearch = async (category, type) => {
    if (!category || !type) return;
    setLoading(true);
    try {
      const data = await getPlans(category, type);
      setPlans(data);
      setVisibleCount(ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedCategory && selectedType) {
      handleSearch(selectedCategory, selectedType);
    }
  }, [selectedCategory, selectedType]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: '1100px',
        mx: 'auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        sx={{
          fontFamily: `'Anton', sans-serif`,
          fontSize:'2.5rem',
          fontWeight:600,
          color: 'white',
          mt: 4,
          mb: 3,
          textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
        }}
      >
       ꜰɪᴛɴᴇꜱꜱ ᴘʟᴀɴꜱ
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          color: 'white',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h6">Select Category</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                svg: { color: 'white' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
              }}
            >
              <MenuItem value="" disabled>
                Category
              </MenuItem>
              {categoryTabs.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {typeFiltersWithIcons.map(({ label, icon }) => (
            <Chip
              key={label}
              label={
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {icon}
                  {label}
                </span>
              }
              clickable
              onClick={() => setSelectedType(label)}
              variant={selectedType === label ? 'filled' : 'outlined'}
              sx={{
                color: selectedType === label ? 'white' : 'white',
                borderColor: 'white',
                backgroundColor: selectedType === label ? '#1976d2' : 'transparent',
                '&:hover': {
                  backgroundColor: selectedType === label ? '#1565c0' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            />
          ))}
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
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 3,
                }}
              >
                {plans.slice(0, visibleCount).map((plan) => (
                  <Card
                    key={plan._id}
                    sx={{
                      transition: 'transform 0.2s ease-in-out, boxShadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                      borderRadius: 2,
                      bgcolor: '#000',
                      color: 'white',
                    }}
                  >
                    {plan.image && (
                      <CardMedia
                        component="img"
                        height="250"
                        image={plan.image}
                        alt={plan.name}
                      />
                    )}
                    <CardContent>
                      <Chip label={plan.type} color="primary" size="small" sx={{ mb: 1 }} />

                      <Typography variant="h6" align="center" gutterBottom>
                        {plan.name}
                      </Typography>

                      <Typography variant="body2" align="center" paragraph>
                        {plan.description}
                      </Typography>

                      {plan.features?.length > 0 && (
                        <List dense>
                          {plan.features.map((feature, idx) => (
                            <ListItem key={idx} disableGutters>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckCircleIcon fontSize="small" color="primary" />
                              </ListItemIcon>
                              <ListItemText primary={feature} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </CardContent>
                  </Card>
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
      </Paper>
    </Box>
  );
};

export default PlansDisplay;
