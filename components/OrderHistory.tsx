import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getSession } from 'next-auth/client';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const session = await getSession();
        if (session) {
          const userOrders = await axios.get('/api/orders', {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          });
          setOrders(userOrders.data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div>
      <Header />
      <main>
        <section>
          <h2>Order History</h2>
          {error && <p className="error-message">{error}</p>}
          <ul>
            {orders.map((order) => (
              <li key={order.id} onClick={() => handleOrderClick(order)}>
                Order #{order.id} - {order.date} - ${order.total}
              </li>
            ))}
          </ul>
        </section>
        {selectedOrder && (
          <section>
            <h2>Order Details</h2>
            <p>Order Number: {selectedOrder.id}</p>
            <p>Date: {selectedOrder.date}</p>
            <p>Total: ${selectedOrder.total}</p>
            <h3>Items</h3>
            <ul>
              {selectedOrder.items.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity} x ${item.price}
                </li>
              ))}
            </ul>
            <h3>Shipping Information</h3>
            <p>{selectedOrder.shippingAddress}</p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
