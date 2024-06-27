import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Col, Row } from 'react-bootstrap';
import { UseAuth } from '../store/auth';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';



const Home = ({ searchQuery}) => {
    const { grain } = UseAuth();

    const dispatch = useDispatch();
   
    
    
    // Check if grainis an array before calling map function
if (!Array.isArray(grain)) {
  console.error('grain data is not an array:', grain);
  return null; // Render nothing if fruit is not an array
}

const filterProduct = grain.filter(grain=>grain.title.toLowerCase().includes(searchQuery.toLowerCase()));

const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Item Added Successfully', {
    });
  };

    return (
        <Container >
        <Row className='py-5 mt-5'>
          {filterProduct.map((product, index) => (
            <Col key={index} xs={6} sm={6} md={4} lg={3} xl={3} className='mb-4'>
              <Card className='shadow h-100' style={{ height: '100%' }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/${product.imgSrc}`}
                  style={{ height: '150px', objectFit: 'cover' }} // Smaller height for mobile devices
                  className="d-block d-sm-none" // Show on mobile
                />
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/${product.imgSrc}`}
                  style={{ height: '250px', objectFit: 'cover' }} // Default height for larger devices
                  className="d-none d-sm-block" // Hide on mobile
                />
                <Card.Body className='d-flex flex-column p-2 p-sm-3'> {/* Reduced padding for mobile */}
                  <Card.Title className='mb-2'>{product.title}</Card.Title>
                  <Card.Text className='text-muted mb-3 d-none d-sm-block'>{product.description}</Card.Text> {/* Hide description on mobile */}
                  <Card.Text className='text-muted mb-3 d-block d-sm-none' style={{ fontSize: '0.85rem' }}>{product.description}</Card.Text> {/* Smaller description text for mobile */}
                  <div className="mt-auto">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                      <Button variant="primary" size="sm" className="mb-2 mb-sm-0">
                        {product.price} ₹
                      </Button>
                      <Button variant="warning" size="sm" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
};

export default Home;
