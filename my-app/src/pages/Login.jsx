import React, { useState } from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/commonStyles.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login data:', formData);
    navigate('/dashboard'); // Navigate to dashboard after login
  };

  return (
    <div className="auth-container">
      <Container>
        <Card className="auth-card mx-auto">
          <Card.Body>
            <h2 className="auth-title">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Login
              </Button>

              <div className="text-center">
                Don't have an account?{' '}
                <Link to="/register">Register here</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;