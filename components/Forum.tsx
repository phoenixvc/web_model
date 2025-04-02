import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Header from './Header';
import Footer from './Footer';

const Forum = () => {
  const [session, loading] = useSession();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/community');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        alert('Failed to fetch posts. Please try again later.');
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('Please log in to post a message.');
      return;
    }

    try {
      const response = await fetch('/api/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newPost, author: session.user.email }),
      });

      if (response.ok) {
        const newPostData = await response.json();
        setPosts([...posts, newPostData]);
        setNewPost('');
      } else {
        alert('Failed to post message.');
      }
    } catch (error) {
      console.error('Failed to post message:', error);
      alert('Failed to post message. Please try again later.');
    }
  };

  const handleReplySubmit = async (e, postId, replyContent) => {
    e.preventDefault();
    if (!session) {
      alert('Please log in to reply to a message.');
      return;
    }

    try {
      const response = await fetch(`/api/community/${postId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyContent, author: session.user.email }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPosts(posts.map(post => post._id === postId ? updatedPost : post));
      } else {
        alert('Failed to reply to message.');
      }
    } catch (error) {
      console.error('Failed to reply to message:', error);
      alert('Failed to reply to message. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Forum</h1>
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write your message here..."
            required
          />
          <button type="submit">Post</button>
        </form>
        <div className="forum-posts">
          {posts.map((post) => (
            <div key={post._id} className="forum-post">
              <p>{post.content}</p>
              <small>Posted by {post.author}</small>
              <form onSubmit={(e) => handleReplySubmit(e, post._id, e.target.replyContent.value)}>
                <textarea
                  name="replyContent"
                  placeholder="Write your reply here..."
                  required
                />
                <button type="submit">Reply</button>
              </form>
              <div className="replies">
                {post.replies && post.replies.map((reply) => (
                  <div key={reply._id} className="reply">
                    <p>{reply.content}</p>
                    <small>Replied by {reply.author}</small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
