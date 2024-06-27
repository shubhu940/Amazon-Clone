
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col,  Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setAddresss } from '../redux/cartSlice';
import { UseAuth } from "../store/auth";


const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { user } = UseAuth();
  const [address,setAddress]= useState({
    fullname:'',
    mobile:'',
    state:'',
    city:'',
    colony:'',
    houseno:'',
    pincode:'',
    username:user._id,
  })
 

  const handleChange = (e) => {
    const {name,value}=e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]:value
    }));
    
  };

  const handleAddressSubmit =async(e)=>{
 e.preventDefault();
 const response = await fetch('http://localhost:3000/api/customer/deliveryaddress',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(address)
 
  });
  if(response.ok){
    dispatch(setAddresss(address)); // Save address to Redux store
    alert("address saved");
    navigate('/confirm-order'); 
 

  }else{
    alert("failed to save address")
  }
};
  return (
    <Container className='my-5'>
      <h2>Checkout</h2>
      <Row className='py-5 mt-5'>
      <Col md={6}>
          <h5>Order Summary</h5>
          <ul>
            {cartItems.map((item) => (
              
              <li key={item._id}>
                <img src={item.imgSrc} alt={item.title} style={{ width: '50px', height: '50px' }} />
                {item.title} x {item.quantity} = {item.price * item.quantity} ₹
              </li>
            ))}
          </ul>
          <h5>Total Price: {totalPrice} ₹</h5>
        </Col>
        <Col md={6}>
        <h5>Shipping Address</h5>
          <Form onSubmit={handleAddressSubmit}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={address.fullname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={address.mobile}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Colony</Form.Label>
              <Form.Control
                type="text"
                name="colony"
                value={address.colony}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>House No</Form.Label>
              <Form.Control
                type="text"
                name="houseno"
                value={address.houseno}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>PinCode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
              />
            </Form.Group>
            <button type="submit">Submit</button>
          </Form>
          
        </Col>
       
      </Row>
    </Container>
  );
};

export default CheckoutPage;
