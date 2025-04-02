import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getSession } from 'next-auth/client';

const Checkout = () => {
  const [session, setSession] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        setSession(session);
      } catch (error) {
        console.error('Failed to fetch session:', error);
        setError('Failed to fetch session. Please try again later.');
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setError('Failed to fetch cart items. Please try again later.');
      }
    };

    fetchSession();
    fetchCartItems();
  }, []);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    const orderData = {
      cartItems,
      paymentInfo,
      shippingInfo
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // Handle successful checkout
      } else {
        throw new Error('Checkout failed');
      }
    } catch (error) {
      console.error('Failed to complete checkout:', error);
      setError('Failed to complete checkout. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Checkout</h1>
        {error && <p className="error-message">{error}</p>}
        <section>
          <h2>Shopping Cart Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.title} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Payment Information</h2>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentChange}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
          />
        </section>
        <section>
          <h2>Shipping Information</h2>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleShippingChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingInfo.state}
            onChange={handleShippingChange}
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={shippingInfo.zip}
            onChange={handleShippingChange}
          />
        </section>
        <button onClick={handleCheckout}>Checkout</button>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
