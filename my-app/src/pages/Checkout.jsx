import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const { subtotal, tax, total } = getCartTotal();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shipping: {
      fullName: '',
      address: '',
      area: '',
      postalCode: '',
      phoneNumber: ''
    },
    payment: {
      method: 'credit',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  });

  // Redirect if cart is empty
  React.useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Handle order submission
      console.log('Order submitted:', {
        ...formData,
        orderDetails: {
          items: cartItems,
          subtotal,
          tax,
          total
        }
      });
      navigate('/order-confirmation');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <div className="checkout-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Shipping</p>
        </div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Payment</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Previous shipping and payment form sections remain the same */}
        {/* ... */}

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="checkout-actions">
          {step === 2 && (
            <button
              type="button"
              className="back-button"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          )}
          <button type="submit" className="continue-button">
            {step === 1 ? 'Continue to Payment' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;