import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main';
import './App.css';
import CheckoutPage from './Checkout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
