import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
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
      console.log('Order submitted:', formData);
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
        {step === 1 && (
          <div className="shipping-section">
            <h2>Shipping Information</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.shipping.fullName}
                onChange={(e) => handleInputChange('shipping', 'fullName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={formData.shipping.address}
                onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Area</label>
              <input
                type="text"
                value={formData.shipping.area}
                onChange={(e) => handleInputChange('shipping', 'area', e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  value={formData.shipping.postalCode}
                  onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.shipping.phoneNumber}
                  onChange={(e) => handleInputChange('shipping', 'phoneNumber', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="payment-section">
            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.payment.method === 'credit'}
                  onChange={() => handleInputChange('payment', 'method', 'credit')}
                />
                Credit Card
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.payment.method === 'cod'}
                  onChange={() => handleInputChange('payment', 'method', 'cod')}
                />
                Cash on Delivery
              </label>
            </div>

            {formData.payment.method === 'credit' && (
              <div className="credit-card-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    value={formData.payment.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      value={formData.payment.expiryDate}
                      onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      value={formData.payment.cvv}
                      onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>$0.00</span>
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