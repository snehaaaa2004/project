import React, { useState, useEffect } from 'react';
import { getPlans } from '../api';
import {
  Select, MenuItem, FormControl,
  Card, CardContent, Typography, Button, CircularProgress,
  Chip, CardMedia, Box, Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

const typeFilters = ['Workout', 'Diet', 'Supplement'];
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
    <Box sx={{ p: 2, maxWidth: '1100px', mx: 'auto', minHeight: '100vh' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontFamily: `'Anton', sans-serif`,
          fontWeight: 700,
          fontSize: '2.8rem',
          color: 'white',
          textShadow: '2px 2px 6px rgba(0,0,0,0.6)',
          mt: 4,
          mb: 3,
        }}
      >
        FITNESS PLANS
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
          {typeFilters.map((label) => (
            <Chip
              key={label}
              label={label}
              clickable
              onClick={() => setSelectedType(label)}
              variant={selectedType === label ? 'filled' : 'outlined'}
              sx={{
                color: 'white',
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
                  <motion.div
                    key={plan._id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      sx={{
                        bgcolor: '#000',
                        color: 'white',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      {plan.image && (
                        <CardMedia
                          component="img"
                          height="220"
                          image={plan.image}
                          alt={plan.name}
                        />
                      )}
                      <CardContent>
                        <Chip
                          label={plan.type}
                          color="primary"
                          size="small"
                          sx={{ mb: 1 }}
                        />

                        <Typography variant="h6" align="center" gutterBottom>
                          {plan.name}
                        </Typography>

                        <Typography variant="body2" align="center">
                          {plan.description}
                        </Typography>
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
      </Paper>
    </Box>
  );
};

export default PlansDisplay;
