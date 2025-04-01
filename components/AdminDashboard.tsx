import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

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
      const usersResponse = await axios.get('/api/users');
      setUsers(usersResponse.data);

      const blogPostsResponse = await axios.get('/api/blog');
      setBlogPosts(blogPostsResponse.data);

      const shopItemsResponse = await axios.get('/api/shop');
      setShopItems(shopItemsResponse.data);

      const eventsResponse = await axios.get('/api/community');
      setEvents(eventsResponse.data);
    };

    fetchSession();
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    await axios.delete(`/api/users/${userId}`);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleDeleteBlogPost = async (postId) => {
    await axios.delete(`/api/blog/${postId}`);
    setBlogPosts(blogPosts.filter((post) => post._id !== postId));
  };

  const handleDeleteShopItem = async (itemId) => {
    await axios.delete(`/api/shop/${itemId}`);
    setShopItems(shopItems.filter((item) => item._id !== itemId));
  };

  const handleDeleteEvent = async (eventId) => {
    await axios.delete(`/api/community/${eventId}`);
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
