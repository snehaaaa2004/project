import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Typography, Grid } from '@mui/material'
import PlanCard from './PlanCard'

const PlanDisplay = () => {

  const [plans, setPlans] = useState([])

   useEffect(() => {

     const fetchPlans = async (data) => {

      try {

        console.log(data)

        const res = await axios.get('',data)

        setPlans(res.data)

      } catch (error) {

        console.error('Error fetching plans:', error)

        alert(error.res.data.message)

      }

    }
  
    fetchPlans()

  }, [])
  
  return (

    <Box sx={{ padding: 4 }}>

      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>

          Your Fitness Plan

      </Typography>

      {!Array.isArray(plans) || plans.length === 0 ? (

           <Typography variant="body1">
          
             No plans available. Add one to get started!
          
          </Typography>

      ) : (

     <Grid container spacing={2}>

        {plans.map(plan => (

         <Grid item xs={12} md={6} lg={4} key={plan._id}>

              <PlanCard {...plan} />

          </Grid>

        ))}

     </Grid>

)}

    </Box>

  )

}

export default PlanDisplay