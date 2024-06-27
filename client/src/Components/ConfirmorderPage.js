import React, { useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UseAuth } from "../store/auth";

const ConfirmOrderPage = () => {
  const [loading, setLoading] = useState(false); // State to track loading status
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const deliveryAddress = useSelector((state) => state.cart.address);
  const { user } = UseAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true); // Set loading to true when payment process starts

    const orderUrl = "http://localhost:3000/create-order";
    const callbackUrl = "http://localhost:3000/payment-callback";

    try {
      // Create order on the server
      const orderResponse = await axios.post(orderUrl, {
        amount: totalPrice,
        currency: "INR",
        receipt: "receipt_id_1",
       
      });

      const {
        id: orderId,
        amount: orderAmount,
        currency: orderCurrency,
      } = orderResponse.data;

      // Options for Razorpay
      const options = {
        key: "rzp_test_Enyad7AS9W8HW5",
        amount: orderAmount,
        currency: orderCurrency,
        name: "Marathi Agri Tech",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderId,
        handler: async (response) => {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            userId: user._id,
            customerMob: deliveryAddress.mobile,
            amount: totalPrice,
            currency: "INR",
            receipt: "receipt_id_1",
          };
          await axios.post(callbackUrl, paymentData);
          alert("Payment successful!");
          navigate("/home");
        },
        prefill: {
          name: deliveryAddress.fullname,
          email: "user@example.com",
          contact: deliveryAddress.mobile,
        },
        notes: {
          address: `${deliveryAddress.fullname}, ${deliveryAddress.city}, ${deliveryAddress.pincode}`,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false); // Set loading to false when payment process completes
    }
  };

  return (
    <Container className="my-5">
      <h2>Confirm Order</h2>
      <Row className="py-5 mt-5">
        <Col md={6}>
          <h5>Shipping Address</h5>
          <p>Name: {deliveryAddress.fullname}</p>
          <p>Mobile: {deliveryAddress.mobile}</p>
          <p>City: {deliveryAddress.city}</p>
          <p>Postal Code: {deliveryAddress.pincode}</p>
        </Col>
        <Col md={6}>
          <h5>Order Summary</h5>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  style={{ width: "50px", height: "50px" }}
                />
                {item.title} x {item.quantity} = {item.price * item.quantity} ₹
              </li>
            ))}
          </ul>
          <h5>Total Price: {totalPrice} ₹</h5>
          <Button variant="success" onClick={handlePayment} disabled={loading}>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Confirm Order & Pay"
            )}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmOrderPage;
