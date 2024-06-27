import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/cartSlice';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <Container className='my-5'>
      <h2>Shopping Cart</h2>
      <Row className='py-5 mt-5'>
        {cartItems.length === 0 ? (
          <Col xs={12}>
            <p>Your cart is empty. <Link to="/">Start shopping</Link>.</p>
          </Col>
        ) : (
          cartItems.map((item) => (
            <Col key={item._id} xs={12} className='mb-3'>
              <div className="cart-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img src={item.imgSrc} alt={item.title} />
                  <div className="item-details">
                    <h5>{item.title}</h5>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price} ₹</p>
                  </div>
                </div>
                <div className="item-actions">
                  <Button variant="secondary" onClick={() => handleDecrement(item)}> - </Button>
                  <Button variant="secondary" onClick={() => handleIncrement(item)}> + </Button>
                  <Button variant="danger" onClick={() => handleRemove(item)}>Remove</Button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
      {cartItems.length > 0 && (
        <>
          <Row>
            <Col className="cart-total">
              <h5>Total Price: {totalPrice} ₹</h5>
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              <Link to="/checkout">
                <Button variant="success">Proceed to Checkout</Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CartPage;
