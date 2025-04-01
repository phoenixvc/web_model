import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSession } from 'next-auth/client';

const BlogPostDetail = ({ post, onEdit, onDelete }) => {
  const [session] = useSession();

  return (
    <div>
      <Header />
      <main>
        <article className="blog-post-detail">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          {session && session.user.email === post.author && (
            <div className="blog-post-actions">
              <button onClick={onEdit}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
