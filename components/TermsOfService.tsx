import React from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

const TermsOfService = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Terms of Service</h1>
        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to our Terms of Service page! When you use our web services, you agree to these terms. Please read them carefully.
          </p>
        </section>
        <section>
          <h2>Using Our Services</h2>
          <p>
            You must follow any policies made available to you within the services. Don’t misuse our services. For example, don’t interfere with our services or try to access them using a method other than the interface and the instructions that we provide.
          </p>
        </section>
        <section>
          <h2>Your Content in Our Services</h2>
          <p>
            Some of our services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content. In short, what belongs to you stays yours.
          </p>
        </section>
        <section>
          <h2>Modifying and Terminating Our Services</h2>
          <p>
            We are constantly changing and improving our services. We may add or remove functionalities or features, and we may suspend or stop a service altogether.
          </p>
        </section>
        <section>
          <h2>Our Warranties and Disclaimers</h2>
          <p>
            We provide our services using a commercially reasonable level of skill and care and we hope that you will enjoy using them. But there are certain things that we don’t promise about our services.
          </p>
        </section>
        <section>
          <h2>Liability for Our Services</h2>
          <p>
            When permitted by law, we will not be responsible for lost profits, revenues, or data, financial losses or indirect, special, consequential, exemplary, or punitive damages.
          </p>
        </section>
        <section>
          <h2>Business Uses of Our Services</h2>
          <p>
            If you are using our services on behalf of a business, that business accepts these terms. It will hold harmless and indemnify us and our affiliates, officers, agents, and employees from any claim, suit or action arising from or related to the use of the services or violation of these terms, including any liability or expense arising from claims, losses, damages, suits, judgments, litigation costs and attorneys’ fees.
          </p>
        </section>
        <section>
          <h2>About These Terms</h2>
          <p>
            We may modify these terms or any additional terms that apply to a service to, for example, reflect changes to the law or changes to our services. You should look at the terms regularly. We’ll post notice of modifications to these terms on this page. We’ll post notice of modified additional terms in the applicable service. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions for a service or changes made for legal reasons will be effective immediately. If you do not agree to the modified terms for a service, you should discontinue your use of that service.
          </p>
        </section>
        <section>
          <h2>Links to Related Pages</h2>
          <ul>
            <li>
              <Link href="/privacy">
                <a>Privacy Policy</a>
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

export default TermsOfService;
