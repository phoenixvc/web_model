import React from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Privacy Policy</h1>
        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to our Privacy Policy page! When you use our web services, you trust us with your information. This Privacy Policy is meant to help you understand what data we collect, why we collect it, and what we do with it. This is important; we hope you will take time to read it carefully.
          </p>
        </section>
        <section>
          <h2>Information We Collect</h2>
          <p>
            We collect information to provide better services to all our users. We collect information in the following ways:
          </p>
          <ul>
            <li>Information you give us. For example, our services require you to sign up for an account. When you do, we’ll ask for personal information, like your name, email address, telephone number or credit card.</li>
            <li>Information we get from your use of our services. We collect information about the services that you use and how you use them, like when you visit a website that uses our advertising services or you view and interact with our ads and content.</li>
          </ul>
        </section>
        <section>
          <h2>How We Use Information We Collect</h2>
          <p>
            We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.
          </p>
        </section>
        <section>
          <h2>Transparency and Choice</h2>
          <p>
            People have different privacy concerns. Our goal is to be clear about what information we collect, so that you can make meaningful choices about how it is used.
          </p>
        </section>
        <section>
          <h2>Information You Share</h2>
          <p>
            Many of our services let you share information with others. Remember that when you share information publicly, it may be indexable by search engines. Our services provide you with different options on sharing and removing your content.
          </p>
        </section>
        <section>
          <h2>Accessing and Updating Your Personal Information</h2>
          <p>
            Whenever you use our services, we aim to provide you with access to your personal information. If that information is wrong, we strive to give you ways to update it quickly or to delete it – unless we have to keep that information for legitimate business or legal purposes.
          </p>
        </section>
        <section>
          <h2>Links to Related Pages</h2>
          <ul>
            <li>
              <Link href="/terms">
                <a>Terms of Service</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact Information</a>
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
