import React, { useState, useEffect } from 'react';
import './title.css';

import cardImage1 from './media/kickstarter.png';
import cardImage2 from './media/met.webp';
import cardImage3 from './media/2048.png';
import cardImage4 from './media/MnC.webp';
import cardImage5 from './media/rizni-rivni.webp';
import cardImage6 from './media/projects.png';
import cardImage7 from './media/product-catalog.png';

const cardData = [
  { id: 7, title: 'Nice Gadgets Store', imageUrl: cardImage7, link: 'https://ellworts.github.io/react_phone-catalog/' },
  { id: 1, title: 'Kickstarter', imageUrl: cardImage1, link: 'https://ellworts.github.io/kickstarter/' },
  { id: 5, title: 'Rizni-Rivni', imageUrl: cardImage5, link: 'https://ellworts.github.io/riznirivni/' },
  { id: 2, title: 'MET Museum', imageUrl: cardImage2, link: 'https://ellworts.github.io/landing-page/' },
  { id: 3, title: '2048 Web Game', imageUrl: cardImage3, link: 'https://ellworts.github.io/2048/' },
  { id: 4, title: 'M&C Steakhouse', imageUrl: cardImage4, link: 'https://ellworts.github.io/mnc-page/' },
  { id: 6, title: 'Portfolio(v1)', imageUrl: cardImage6, link: 'https://ellworts.github.io/portfolio/' },
];

function Title() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleKeyDown = (event) => {
      if (!isMobile) {
        if (event.key === 'ArrowRight') {
          handleNext();
        } else if (event.key === 'ArrowLeft') {
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, currentPage]);

  const currentCards = isMobile
    ? cardData
    : cardData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFading(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFading(false);
      }, 300);
    }
  };

  return (
    <div data-aos="fade-up" className="title">
      {!isMobile && (
        <button onClick={handlePrev} disabled={currentPage === 0} className="pagination-button left">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14 8l-4 4l4 4"></path>
          </svg>
        </button>
      )}
      <div className={`card-list ${isFading ? 'fade' : ''}`}>
        {currentCards.map((card) => (
          <a href={card.link} target="_blank" rel="noopener noreferrer" className="card" key={card.id}>
            <div
              className="card-background"
              style={{ backgroundImage: `url(${card.imageUrl})` }}
              loading="lazy"
            />
            <div className="card-title">{card.title}</div>
          </a>
        ))}
      </div>
      {!isMobile && (
        <button onClick={handleNext} disabled={currentPage === totalPages - 1} className="pagination-button right">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10 16l4-4l-4-4"></path>
          </svg>
        </button>
      )}
    </div>
  );
}

export default Title;
