import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPlans } from '../api';
import { Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, Grid, IconButton, Modal, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Optional: Get icons based on plan type
const getIconForType = (type) => {
  switch (type) {
    case 'Workout':
      return <CheckCircleIcon />;
    case 'Diet':
      return <CheckCircleIcon />;
    case 'Supplement':
      return <CheckCircleIcon />;
    default:
      return <CheckCircleIcon />;
  }
};

const PlansResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getPlans(category, type);
        console.log('Fetched plans:', plansData);
        setPlans(plansData);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlans();
  }, [category, type]);

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
    setModalOpen(false);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  if (loading) {
    return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="black">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bgcolor="black"
      sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '2rem',
      }}
    >
      <Paper elevation={3} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Box sx={{ mt: 4 }}>
          {plans.length === 0 ? (
            <Typography align="center" color="white" sx={{ mt: 6, fontStyle: 'italic' }}>
              No plans available for this selection.
            </Typography>
          ) : (
            <>
              <Grid container spacing={4} justifyContent="center">
  {plans.slice(0, visibleCount).map((plan, index) => (
    <Grid
      key={plan._id}
      sx={{
        flexBasis: {
          xs: '100%', 
          sm: '48%', 
          md: '30%', 
        },
        flexGrow: 0,
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.03 }}
        style={{ width: '100%' }}
      >
        <Card
          onClick={() => handleOpenModal(plan)}
          sx={{
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
            <Typography variant="body2" align="center" sx={{ mb: 1 }}>
              {plan.description}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  ))}
</Grid>


              {visibleCount < plans.length && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={handleShowMore}
                    sx={{ color: 'white', borderColor: 'white' }}
                  >
                    Show More
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>

        {/* Modal Section */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#111',
              color: 'white',
              p: 4,
              borderRadius: 2,
              width: '90%',
              maxWidth: 500,
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
            {selectedPlan && (
              <>
                {selectedPlan.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={selectedPlan.image}
                    alt={selectedPlan.name}
                    sx={{ mb: 2 }}
                  />
                )}
                <Typography variant="h5" gutterBottom>
                  {selectedPlan.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedPlan.description}
                </Typography>
                {selectedPlan.features && selectedPlan.features.length > 0 && (
                  <Box component="ul" sx={{ pl: 2, mt: 2 }}>
                    {selectedPlan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '4px',
                        }}
                      >
                        <CheckCircleIcon
                          sx={{ fontSize: 18, color: '#2196f3', mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ color: '#ccc' }}>
                          {feature}
                        </Typography>
                      </li>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Modal>
      </Paper>

      {/* GO BACK button at Bottom */}
      <Box display="flex" justifyContent="center" marginTop="2rem" marginBottom="2rem">
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{
            backgroundColor: '#2196f3',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#1976d2',
              boxShadow: '0px 6px 16px rgba(0,0,0,0.5)',
            },
          }}
        >
          GO BACK
        </Button>
      </Box>
    </Box>
  );
};

export default PlansResults;
