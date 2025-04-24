import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g. muscle-gain, weight-loss
  type: { type: String, enum: ['workout', 'diet', 'supplement'], required: true },
  name: { type: String, required: true },
  description: String,
  features: [String], // NEW FIELD
  image: String       // Optional: for card images (since your frontend uses it)
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
