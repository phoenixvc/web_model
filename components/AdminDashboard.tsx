import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getSession } from 'next-auth/client';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchBlogPosts, fetchShopItems, fetchEvents } from '../redux/actions';
import { debounce } from 'lodash';

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const blogPosts = useSelector((state) => state.blogPosts);
  const shopItems = useSelector((state) => state.shopItems);
  const events = useSelector((state) => state.events);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
    dispatch(fetchUsers());
    dispatch(fetchBlogPosts());
    dispatch(fetchShopItems());
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDeleteUser = useCallback(async (userId) => {
    await axios.delete(`${API_ENDPOINTS.USERS}/${userId}`);
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteBlogPost = useCallback(async (postId) => {
    await axios.delete(`${API_ENDPOINTS.BLOG}/${postId}`);
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const handleDeleteShopItem = useCallback(async (itemId) => {
    await axios.delete(`${API_ENDPOINTS.SHOP}/${itemId}`);
    dispatch(fetchShopItems());
  }, [dispatch]);

  const handleDeleteEvent = useCallback(async (eventId) => {
    await axios.delete(`${API_ENDPOINTS.COMMUNITY}/${eventId}`);
    dispatch(fetchEvents());
  }, [dispatch]);

  const debouncedSearch = useMemo(() => debounce((query) => {
    // Implement search functionality here
  }, 300), []);

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
