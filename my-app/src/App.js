import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NavigationBar from './components/Navbar';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;