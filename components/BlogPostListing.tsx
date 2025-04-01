import React, { useState } from 'react';
import Link from 'next/link';
import Header from './Header';

const BlogPostListing = ({ posts, onSelectPost }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <main>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredPosts.map((post) => (
          <div key={post._id} className="blog-post-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link href={`/blog/${post._id}`}>
              <a onClick={() => onSelectPost(post)}>Read More</a>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default BlogPostListing;
