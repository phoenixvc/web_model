import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/apiEndpoints';

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const [users, setUsers] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    const fetchData = async () => {
      const usersResponse = await axios.get(API_ENDPOINTS.USERS);
      setUsers(usersResponse.data);

      const blogPostsResponse = await axios.get(API_ENDPOINTS.BLOG);
      setBlogPosts(blogPostsResponse.data);

      const shopItemsResponse = await axios.get(API_ENDPOINTS.SHOP);
      setShopItems(shopItemsResponse.data);

      const eventsResponse = await axios.get(API_ENDPOINTS.COMMUNITY);
      setEvents(eventsResponse.data);
    };

    fetchSession();
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    await axios.delete(`${API_ENDPOINTS.USERS}/${userId}`);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleDeleteBlogPost = async (postId) => {
    await axios.delete(`${API_ENDPOINTS.BLOG}/${postId}`);
    setBlogPosts(blogPosts.filter((post) => post._id !== postId));
  };

  const handleDeleteShopItem = async (itemId) => {
    await axios.delete(`${API_ENDPOINTS.SHOP}/${itemId}`);
    setShopItems(shopItems.filter((item) => item._id !== itemId));
  };

  const handleDeleteEvent = async (eventId) => {
    await axios.delete(`${API_ENDPOINTS.COMMUNITY}/${eventId}`);
    setEvents(events.filter((event) => event._id !== eventId));
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Admin Dashboard</h1>
        <section>
          <h2>User Management</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.username} - {user.email}
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Content Management</h2>
          <h3>Blog Posts</h3>
          <ul>
            {blogPosts.map((post) => (
              <li key={post._id}>
                {post.title}
                <button onClick={() => handleDeleteBlogPost(post._id)}>Delete</button>
              </li>
            ))}
          </ul>
          <h3>Shop Items</h3>
          <ul>
            {shopItems.map((item) => (
              <li key={item._id}>
                {item.title}
                <button onClick={() => handleDeleteShopItem(item._id)}>Delete</button>
              </li>
            ))}
          </ul>
          <h3>Community Events</h3>
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                {event.title}
                <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
