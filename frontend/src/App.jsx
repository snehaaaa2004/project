import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlansDisplay from './componenets/PlansDisplay';
import PlansResults from './componenets/PlanResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlansDisplay />} />
        <Route path="/plans" element={<PlansResults />} />
      </Routes>
    </Router>
  );
}

export default App;
