import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getSession } from 'next-auth/client';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [analytics, setAnalytics] = useState({});

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

        const userActivities = await axios.get('/api/activities', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setActivities(userActivities.data);

        const userAnalytics = await axios.get('/api/analytics', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        });
        setAnalytics(userAnalytics.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <section>
          <h2>User Dashboard</h2>
          {user && (
            <div>
              <img src={user.profilePicture} alt="Profile" />
              <h3>{user.username}</h3>
              <p>{user.bio}</p>
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
        <section>
          <h2>Analytics</h2>
          <div>
            <p>Engagement: {analytics.engagement}</p>
            <p>Activity: {analytics.activity}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
