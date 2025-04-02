import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getSession } from 'next-auth/client';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    profilePicture: '',
    socialMediaLinks: [],
    privacySettings: 'public',
    achievements: []
  });
  const [activityFilter, setActivityFilter] = useState('all');

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
          profilePicture: userProfile.data.profilePicture,
          socialMediaLinks: userProfile.data.socialMediaLinks,
          privacySettings: userProfile.data.privacySettings,
          achievements: userProfile.data.achievements
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

  const handleActivityFilterChange = (e) => {
    setActivityFilter(e.target.value);
  };

  const filteredActivities = activities.filter((activity) => {
    if (activityFilter === 'all') return true;
    return activity.type === activityFilter;
  });

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
                  <input
                    type="text"
                    name="socialMediaLinks"
                    value={profileData.socialMediaLinks.join(', ')}
                    onChange={(e) =>
                      setProfileData((prevData) => ({
                        ...prevData,
                        socialMediaLinks: e.target.value.split(', ')
                      }))
                    }
                  />
                  <select
                    name="privacySettings"
                    value={profileData.privacySettings}
                    onChange={handleChange}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                  <button onClick={handleSave}>Save</button>
                </div>
              ) : (
                <div>
                  <h3>{user.username}</h3>
                  <p>{user.bio}</p>
                  <p>Social Media Links: {user.socialMediaLinks.join(', ')}</p>
                  <p>Privacy Settings: {user.privacySettings}</p>
                  <button onClick={handleEdit}>Edit Profile</button>
                </div>
              )}
            </div>
          )}
        </section>
        <section>
          <h2>Recent Activities</h2>
          <select value={activityFilter} onChange={handleActivityFilterChange}>
            <option value="all">All</option>
            <option value="posts">Posts</option>
            <option value="comments">Comments</option>
            <option value="likes">Likes</option>
          </select>
          <ul>
            {filteredActivities.map((activity) => (
              <li key={activity.id}>{activity.description}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Achievements</h2>
          <ul>
            {profileData.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
