import React, { useState } from 'react';
import { Container, Card, Form, Button, Table } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaMotorcycle, FaEdit, FaSave } from 'react-icons/fa';
import '../styles/RiderProfile.css';

const RiderProfile = () => {
  const [riderData, setRiderData] = useState({
    name: 'John Doe',
    email: '',
    contact: '',
    cnic: '1234567890123',
    numberPlate: 'ABC-123'
  });

  const [editing, setEditing] = useState({
    name: false,
    email: false,
    contact: false,
    cnic: false,
    numberPlate: false
  });

  // Sample orders data - replace with actual data from your backend
  const [orders] = useState([
    { id: 1, customer: 'John Doe', address: '123 Main St', amount: '$50.00', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', address: '456 Oak Ave', amount: '$75.00', status: 'In Progress' },
    { id: 3, customer: 'Bob Johnson', address: '789 Pine Rd', amount: '$30.00', status: 'Delivered' }
  ]);

  const handleEdit = (field) => {
    setEditing(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSave = (field) => {
    setEditing(prev => ({
      ...prev,
      [field]: false
    }));
    localStorage.setItem('riderData', JSON.stringify(riderData));
  };

  const handleChange = (field, value) => {
    if (field === 'contact' || field === 'cnic') {
      const numbersOnly = value.replace(/\D/g, '');
      setRiderData(prev => ({
        ...prev,
        [field]: numbersOnly
      }));
    } else {
      setRiderData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const renderEditableField = (label, field, icon, isEditable = true) => (
    <Card className="mb-3 rider-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="rider-field-icon me-3">
              {icon}
            </div>
            <div>
              <span className="rider-field-label">{label}</span>
              {!editing[field] ? (
                <div className="rider-field-value">{riderData[field] || 'Not set'}</div>
              ) : (
                <Form.Control
                  type={field === 'contact' ? 'tel' : 'text'}
                  value={riderData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  size="sm"
                  className="rider-field-input"
                  pattern={field === 'contact' ? '[0-9]*' : undefined}
                  inputMode={field === 'contact' ? 'numeric' : 'text'}
                  placeholder={
                    field === 'contact'
                      ? 'Enter numbers only'
                      : undefined
                  }
                />
              )}
            </div>
          </div>
          {isEditable && (
            !editing[field] ? (
              <Button 
                variant="outline-primary" 
                size="sm"
                className="rider-edit-button"
                onClick={() => handleEdit(field)}
              >
                <FaEdit />
              </Button>
            ) : (
              <Button 
                variant="success" 
                size="sm"
                className="rider-save-button"
                onClick={() => handleSave(field)}
              >
                <FaSave />
              </Button>
            )
          )}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="rider-container py-5">
      <h2 className="rider-title mb-4">
        <FaUser className="me-2" />
        Rider Profile
      </h2>
      
      <section className="mb-5">
        {renderEditableField('Name', 'name', <FaUser />, false)}
        {renderEditableField('Email', 'email', <FaEnvelope />)}
        {renderEditableField('Contact', 'contact', <FaPhone />)}
        {renderEditableField('CNIC', 'cnic', <FaIdCard />, false)}
        {renderEditableField('Bike Number Plate', 'numberPlate', <FaMotorcycle />, false)}
      </section>

      <section className="rider-orders-section">
        <h3 className="rider-section-title mb-4">Delivery Orders</h3>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Delivery Address</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={badge ${order.status === 'Delivered' ? 'rider-badge-success' : order.status === 'In Progress' ? 'rider-badge-warning' : 'rider-badge-secondary'}}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="rider-action-button"
                    disabled={order.status === 'Delivered'}
                  >
                    {order.status === 'Pending' ? 'Start Delivery' : 'Update Status'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </Container>
  );
};

export default RiderProfile;