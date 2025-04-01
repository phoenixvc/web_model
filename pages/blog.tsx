import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPostListing from '../components/BlogPostListing';
import BlogPostDetail from '../components/BlogPostDetail';
import BlogPostEditor from '../components/BlogPostEditor';

const BlogPage = () => {
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    const fetchPosts = async () => {
      const response = await fetch('/api/blog');
      const data = await response.json();
      setPosts(data);
    };

    fetchSession();
    fetchPosts();
  }, []);

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setIsEditing(false);
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleSavePost = async (post) => {
    const response = await fetch('/api/blog', {
      method: post._id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
      setSelectedPost(updatedPost);
      setIsEditing(false);
    }
  };

  const handleDeletePost = async (postId) => {
    const response = await fetch('/api/blog', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: postId }),
    });

    if (response.ok) {
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
      setSelectedPost(null);
    }
  };

  return (
    <div>
      <Header />
      <main>
        {selectedPost ? (
          isEditing ? (
            <BlogPostEditor
              post={selectedPost}
              onSave={handleSavePost}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <BlogPostDetail
              post={selectedPost}
              onEdit={() => handleEditPost(selectedPost)}
              onDelete={() => handleDeletePost(selectedPost._id)}
            />
          )
        ) : (
          <BlogPostListing posts={posts} onSelectPost={handleSelectPost} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
