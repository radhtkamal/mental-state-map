import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MentalStateBoard from './components/MentalStateBoard';
import TaskLogger from './pages/TaskLogger';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Routes>
          <Route path="/" element={<MentalStateBoard />} />
          <Route path="/tasks" element={<TaskLogger />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
