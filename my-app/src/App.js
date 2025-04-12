import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import NavigationBar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import RiderProfile from './pages/RiderProfile'; // Add this import
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/rider" element={<RiderProfile />} /> {/* Add this route */}
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;