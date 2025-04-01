import React from 'react';
import Header from './Header';

const tips = [
  {
    title: 'Tip 1',
    description: 'Description for tip 1',
    image: '/images/tip1.jpg',
    link: '/tip1'
  },
  {
    title: 'Tip 2',
    description: 'Description for tip 2',
    image: '/images/tip2.jpg',
    link: '/tip2'
  },
  {
    title: 'Tip 3',
    description: 'Description for tip 3',
    image: '/images/tip3.jpg',
    link: '/tip3'
  }
];

const Tips = () => {
  return (
    <div>
      <Header />
      <main>
        <div className="tips-grid">
          {tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <h2>{tip.title}</h2>
              <p>{tip.description}</p>
              <img src={tip.image} alt={tip.title} />
              <a href={tip.link}>Read More</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Tips;
