import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample product data (later this will come from an API/backend)
  const products = [
    {
      id: 1,
      name: 'Fresh Milk',
      price: 2.99,
      category: 'Dairy',
      image: 'https://via.placeholder.com/150',
      description: '1 Liter'
    },
    {
      id: 2,
      name: 'Whole Wheat Bread',
      price: 1.99,
      category: 'Bakery',
      image: 'https://via.placeholder.com/150',
      description: '400g'
    },
    // Add more products as needed
  ];

  const categories = [
    'All',
    'Fruits & Vegetables',
    'Dairy',
    'Bakery',
    'Beverages',
    'Snacks',
    'Household'
  ];

  const handleAddToCart = (product) => {
    // Add cart logic here
    console.log('Added to cart:', product);
  };

  return (
    <Container fluid>
      {/* Search Bar */}
      <Row className="my-4">
        <Col md={6} className="mx-auto">
          <InputGroup>
            <Form.Control
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        {/* Categories Sidebar */}
        <Col md={3}>
          <Card>
            <Card.Header className="bg-primary text-white">
              Categories
            </Card.Header>
            <Card.Body className="p-0">
              <div className="list-group">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="list-group-item list-group-item-action"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Products Grid */}
        <Col md={9}>
          <Row>
            {products.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <Card className="h-100">
                  <Card.Img 
                    variant="top" 
                    src={product.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text className="text-muted">
                      {product.description}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">${product.price}</h5>
                        <Button 
                          variant="primary"
                          onClick={() => handleAddToCart(product)}
                        >
                          <FaShoppingCart className="me-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;