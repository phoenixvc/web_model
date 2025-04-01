import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Header from './Header';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      if (session) {
        const response = await axios.get('/api/notifications', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setNotifications(response.data);
      }
    };

    fetchSession();
  }, []);

  const markAsRead = async (id) => {
    const response = await axios.put('/api/notifications', { id, read: true }, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });
    if (response.status === 200) {
      setNotifications(notifications.map(notification => 
        notification._id === id ? { ...notification, read: true } : notification
      ));
    }
  };

  const deleteNotification = async (id) => {
    const response = await axios.delete('/api/notifications', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      },
      data: { id }
    });
    if (response.status === 200) {
      setNotifications(notifications.filter(notification => notification._id !== id));
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Notifications</h1>
        <ul>
          {notifications.map(notification => (
            <li key={notification._id} className={notification.read ? 'read' : 'unread'}>
              <p>{notification.message}</p>
              <p>{new Date(notification.timestamp).toLocaleString()}</p>
              <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>
              <button onClick={() => deleteNotification(notification._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Notifications;
