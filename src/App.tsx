import React from 'react';
import './App.css';
import Main from './components/main';
import CheckoutPage from './Checkout';

function App() {
  // Extract query params from window.location
  const queryParams = new URLSearchParams(window.location.search);
  const showCheckout = queryParams.get("checkout") === "true";

  return (
    <div className="App">
      {showCheckout ? <CheckoutPage /> : <Main />}
    </div>
  );
}

export default App;
