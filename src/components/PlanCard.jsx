import React from 'react'
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material'

const PlanCard = ({ title, description, exercises }) => (

  <Card sx={{ width: { xs: '100%', sm: 400 }, margin: 2, borderRadius: 3, boxShadow: 3 }}>

    <CardContent>

      <Typography variant="h5">
        
        {title}
        
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }} gutterBottom>

          {description}

      </Typography>

      <List>

        {exercises.map((ex, index) => (

          <ListItem key={index}>

            <ListItemText primary={ex.name} secondary={`Reps: ${ex.reps}, Sets: ${ex.sets}`} />

          </ListItem>

        ))}

      </List>

    </CardContent>

  </Card>
  
)

export default PlanCard