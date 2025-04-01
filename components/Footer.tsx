import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <Link href="/">
          <a>Webcam Modeling</a>
        </Link>
      </div>
      <nav className="footer-nav">
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
        </ul>
      </nav>
      <div className="footer-contact">
        <p>Contact us: info@webcammodeling.com</p>
        <div className="footer-social">
          <a href="https://twitter.com/webcammodeling" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com/webcammodeling" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
      <div className="footer-legal">
        <Link href="/terms">
          <a>Terms of Service</a>
        </Link>
        <Link href="/privacy">
          <a>Privacy Policy</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
