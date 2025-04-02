import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/client';

const Header = () => {
  const [session, loading] = useSession();

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    try {
      // Implement search functionality here
    } catch (error) {
      console.error('Failed to search:', error);
      alert('Failed to search. Please try again later.');
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <a>Webcam Modeling</a>
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/shop">
              <a>Shop</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/community">
              <a>Community</a>
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={() => signIn()}>Login</button>
              </li>
              <li>
                <Link href="/register">
                  <a>Sign Up</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input type="text" name="search" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
