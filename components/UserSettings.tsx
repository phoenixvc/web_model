import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/apiEndpoints';

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [settingsData, setSettingsData] = useState({
    username: '',
    email: '',
    profilePicture: '',
    password: '',
    notifications: {
      email: false,
      inApp: false
    },
    privacySettings: 'public'
  });

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        const userProfile = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setUser(userProfile.data);
        setSettingsData({
          username: userProfile.data.username,
          email: userProfile.data.email,
          profilePicture: userProfile.data.profilePicture,
          notifications: userProfile.data.notifications,
          privacySettings: userProfile.data.privacySettings
        });

        const notificationPreferences = await axios.get(`${API_ENDPOINTS.ASPIRE}/notification-preferences`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setSettingsData((prevData) => ({
          ...prevData,
          notifications: notificationPreferences.data
        }));
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const session = await getSession();
    await axios.put('/api/profile', settingsData, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });

    await axios.put(`${API_ENDPOINTS.ASPIRE}/notification-preferences`, settingsData.notifications, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });

    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSettingsData((prevData) => ({
        ...prevData,
        notifications: {
          ...prevData.notifications,
          [name]: checked
        }
      }));
    } else {
      setSettingsData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  return (
    <div>
      <Header />
      <main>
        <section>
          <h2>User Settings</h2>
          {user && (
            <div>
              <img src={user.profilePicture} alt="Profile" />
              {editing ? (
                <div>
                  <input
                    type="text"
                    name="username"
                    value={settingsData.username}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={settingsData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    value={settingsData.password}
                    onChange={handleChange}
                  />
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="email"
                        checked={settingsData.notifications.email}
                        onChange={handleChange}
                      />
                      Email Notifications
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="inApp"
                        checked={settingsData.notifications.inApp}
                        onChange={handleChange}
                      />
                      In-App Notifications
                    </label>
                  </div>
                  <div>
                    <label>
                      Privacy Settings:
                      <select
                        name="privacySettings"
                        value={settingsData.privacySettings}
                        onChange={handleChange}
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </label>
                  </div>
                  <button onClick={handleSave}>Save</button>
                </div>
              ) : (
                <div>
                  <h3>{user.username}</h3>
                  <p>{user.email}</p>
                  <button onClick={handleEdit}>Edit Settings</button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserSettings;
