import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Header from './Header';
import { API_ENDPOINTS } from '../utils/apiEndpoints';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [session, setSession] = useState(null);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: false,
    inApp: false
  });

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
      if (session) {
        const response = await axios.get(`${API_ENDPOINTS.ASPIRE}/notifications`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setNotifications(response.data);

        const preferencesResponse = await axios.get(`${API_ENDPOINTS.ASPIRE}/notification-preferences`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setNotificationPreferences(preferencesResponse.data);
      }
    };

    fetchSession();
  }, []);

  const markAsRead = async (id) => {
    const response = await axios.put(`${API_ENDPOINTS.ASPIRE}/notifications`, { id, read: true }, {
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
    const response = await axios.delete(`${API_ENDPOINTS.ASPIRE}/notifications`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      },
      data: { id }
    });
    if (response.status === 200) {
      setNotifications(notifications.filter(notification => notification._id !== id));
    }
  };

  const handlePreferenceChange = async (e) => {
    const { name, checked } = e.target;
    const updatedPreferences = { ...notificationPreferences, [name]: checked };
    setNotificationPreferences(updatedPreferences);

    const response = await axios.put(`${API_ENDPOINTS.ASPIRE}/notification-preferences`, updatedPreferences, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });

    if (response.status !== 200) {
      // Handle error
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
        <section>
          <h2>Notification Preferences</h2>
          <label>
            <input
              type="checkbox"
              name="email"
              checked={notificationPreferences.email}
              onChange={handlePreferenceChange}
            />
            Email Notifications
          </label>
          <label>
            <input
              type="checkbox"
              name="inApp"
              checked={notificationPreferences.inApp}
              onChange={handlePreferenceChange}
            />
            In-App Notifications
          </label>
        </section>
      </main>
    </div>
  );
};

export default Notifications;
