import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getSession } from 'next-auth/client';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    profilePicture: ''
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
        setProfileData({
          username: userProfile.data.username,
          bio: userProfile.data.bio,
          profilePicture: userProfile.data.profilePicture
        });

        const userActivities = await axios.get('/api/activities', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setActivities(userActivities.data);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const session = await getSession();
    await axios.put('/api/profile', profileData, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    });
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <Header />
      <main>
        <section>
          <h2>User Profile</h2>
          {user && (
            <div>
              <img src={user.profilePicture} alt="Profile" />
              {editing ? (
                <div>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                  />
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                  />
                  <button onClick={handleSave}>Save</button>
                </div>
              ) : (
                <div>
                  <h3>{user.username}</h3>
                  <p>{user.bio}</p>
                  <button onClick={handleEdit}>Edit Profile</button>
                </div>
              )}
            </div>
          )}
        </section>
        <section>
          <h2>Recent Activities</h2>
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>{activity.description}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
