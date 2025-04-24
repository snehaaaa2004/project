import axios from 'axios';

export const getPlans = async (category, type) => {
  console.log('Frontend sending:', category, type);
  const res = await axios.get(`http://localhost:3000/plans?category=${category}&type=${type}`);
  return res.data;
};
