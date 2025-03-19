import './App.css';
import HomePage from './pages/home-page/home';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutPage from './pages/about-page/about';
import Title from './pages/projects-page/title';
import ContactPage from './pages/contact-page/contact';
import FloatingChat from './FloatingChat/FloatingChat';
import BlogPage from './pages/blog-page/blog';

function Navigation({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-menu ${isVisible ? '' : 'hidden'}`}>
      <div className="burger-menu-wrapper">
        <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={menuOpen ? 'line open' : 'line'}></div>
          <div className={menuOpen ? 'line open' : 'line'}></div>
          <div className={menuOpen ? 'line open' : 'line'}></div>
        </div>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
        <li><button className={activePage === 'Home' ? 'active' : ''} onClick={() => { setActivePage('Home'); setMenuOpen(false); }}>Home</button></li>
        <li><button className={activePage === 'About' ? 'active' : ''} onClick={() => { setActivePage('About'); setMenuOpen(false); }}>About</button></li>
        <li><button className={activePage === 'Projects' ? 'active' : ''} onClick={() => { setActivePage('Projects'); setMenuOpen(false); }}>Projects</button></li>
        <li><button className={activePage === 'Contact' ? 'active' : ''} onClick={() => { setActivePage('Contact'); setMenuOpen(false); }}>Contact</button></li>
        <li><button className={activePage === 'Blog' ? 'active' : ''} onClick={() => { setActivePage('Blog'); setMenuOpen(false); }}>Blog</button></li>
      </ul>
    </nav>
  );
}

function App() {
  const [activePage, setActivePage] = useState('Home');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="App">
      <FloatingChat />
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      {activePage === 'Home' && <HomePage />}
      {activePage === 'About' && <AboutPage />}
      {activePage === 'Projects' && <Title />}
      {activePage === 'Contact' && <ContactPage />}
      {activePage === 'Blog' && <BlogPage />}
    </div>
  );
}

export default App;
