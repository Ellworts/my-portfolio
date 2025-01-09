import React from 'react';
import './title.css';

import cardImage1 from './media/kickstarter.png';
import cardImage2 from './media/met.webp';
import cardImage3 from './media/2048.png';
import cardImage4 from './media/MnC.webp';
import cardImage5 from './media/rizni-rivni.webp';
import cardImage6 from './media/projects.png';

const cardData = [
  { id: 1, title: 'Kickstarter', imageUrl: cardImage1, link: 'https://ellworts.github.io/kickstarter/' },
  { id: 5, title: 'Rizni-Rivni', imageUrl: cardImage5, link: 'https://ellworts.github.io/riznirivni/' },
  { id: 2, title: 'MET Museum', imageUrl: cardImage2, link: 'https://ellworts.github.io/landing-page/' },
  { id: 3, title: '2048 Web Game', imageUrl: cardImage3, link: 'https://ellworts.github.io/2048/' },
  { id: 4, title: 'M&C Steakhouse', imageUrl: cardImage4, link: 'https://ellworts.github.io/mnc-page/' },
  { id: 6, title: 'Portfolio(v1)', imageUrl: cardImage6, link: 'https://ellworts.github.io/portfolio/' },
];

function Title() {
  return (
    <div  data-aos="fade-up" className="title">
      <div className="card-list">
        {cardData.map((card) => (
          <a href={card.link} target="_blank" rel="noopener noreferrer" className="card" key={card.id}>
            <div
              className="card-background"
              style={{ backgroundImage: `url(${card.imageUrl})`, }}
              loading="lazy"
            />
            <div className="card-title">{card.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Title;
