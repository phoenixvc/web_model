import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/client';

const Header = () => {
  const [session, loading] = useSession();

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
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;
