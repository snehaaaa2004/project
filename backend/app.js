import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Plan from './models/Plan.js'

import path from 'path';

console.log('Current directory:', path.resolve());

const app = express()

app.use(cors())

app.use(express.json())


// MongoDB connection

mongoose.connect('mongodb+srv://dhiyasusanthomas100:2DtOY75d7fXSts1U@cluster0.nlbfgvx.mongodb.net/gym')

.then(() => console.log('MongoDB connected'))

.catch((err) => console.error(err))

// Route to get plans based on category and type

app.get('/plans', async (req, res) => {
  
  try {
    const { category, type } = req.query;

    const query = {};

    if (category) query.category = new RegExp(`^${category}$`, 'i');
    if (type) query.type = new RegExp(`^${type}$`, 'i');

    console.log('Query received by backend:', query);

    const plans = await Plan.find(query);
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const PORT = 3000

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`)

});
