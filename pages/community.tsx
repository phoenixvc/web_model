import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Forum from '../components/Forum';
import Events from '../components/Events';
import { getSession } from 'next-auth/client';

const CommunityPage = ({ session }) => {
  if (!session) {
    return <p>Please log in to access the community page.</p>;
  }

  return (
    <div>
      <Header />
      <main>
        <h1>Community</h1>
        <Forum />
        <Events />
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

export default CommunityPage;
