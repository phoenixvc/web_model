import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getSession } from 'next-auth/client';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchBlogPosts, fetchShopItems, fetchEvents } from '../redux/actions';
import { debounce } from 'lodash';
import Chart from 'chart.js/auto';

const AdminDashboard = () => {
  const [session, setSession] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const blogPosts = useSelector((state) => state.blogPosts);
  const shopItems = useSelector((state) => state.shopItems);
  const events = useSelector((state) => state.events);
  const [userActivityData, setUserActivityData] = useState([]);
  const [contentPerformanceData, setContentPerformanceData] = useState([]);

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

  useEffect(() => {
    const fetchUserActivityData = async () => {
      const response = await axios.get(`${API_ENDPOINTS.ASPIRE}/user-activity`);
      setUserActivityData(response.data);
    };

    const fetchContentPerformanceData = async () => {
      const response = await axios.get(`${API_ENDPOINTS.ASPIRE}/content-performance`);
      setContentPerformanceData(response.data);
    };

    fetchUserActivityData();
    fetchContentPerformanceData();
  }, []);

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

  const renderUserActivityChart = () => {
    const ctx = document.getElementById('userActivityChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: userActivityData.map((data) => data.date),
        datasets: [
          {
            label: 'User Activity',
            data: userActivityData.map((data) => data.activityCount),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      },
    });
  };

  const renderContentPerformanceChart = () => {
    const ctx = document.getElementById('contentPerformanceChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: contentPerformanceData.map((data) => data.contentTitle),
        datasets: [
          {
            label: 'Content Performance',
            data: contentPerformanceData.map((data) => data.performanceScore),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (userActivityData.length > 0) {
      renderUserActivityChart();
    }
  }, [userActivityData]);

  useEffect(() => {
    if (contentPerformanceData.length > 0) {
      renderContentPerformanceChart();
    }
  }, [contentPerformanceData]);

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
        <section>
          <h2>User Activity Analytics</h2>
          <canvas id="userActivityChart"></canvas>
        </section>
        <section>
          <h2>Content Performance Analytics</h2>
          <canvas id="contentPerformanceChart"></canvas>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
