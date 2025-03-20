import React, { useEffect, useState } from 'react';
import './home.css';
import myPhoto from './media/my-photo.webp';

function HomePage() {
  const [text, setText] = useState('');
  const [isWebDeveloper, setIsWebDeveloper] = useState(true);
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delay = 2000;

  useEffect(() => {
    let isDeleting = false;
    let charIndex = 0;
    let timeout;

    const type = () => {
      const fullText = isWebDeveloper ? 'Web Developer' : 'Frontend Developer';

      if (isDeleting) {
        if (charIndex > 0) {
          setText(fullText.substring(0, charIndex - 1));
          charIndex--;
          timeout = setTimeout(type, deletingSpeed);
        } else {
          isDeleting = false;
          setIsWebDeveloper(!isWebDeveloper);
          timeout = setTimeout(type, delay);
        }
      } else {
        if (charIndex < fullText.length) {
          setText(fullText.substring(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, typingSpeed);
        } else {
          isDeleting = true;
          timeout = setTimeout(type, delay);
        }
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [isWebDeveloper]);

  return (
    <div className='info' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="left" data-aos="fade-right">
        <p className="greetings">Hello, I'm</p>
        <h1 className="my-name">Mykhailo Kuptsov</h1>
        <h2 className="job">
          {text}
          <span className="typing-cursor"></span>
        </h2>
        <p className="location"><span className="underline-anim">London</span>, <span className="underline-anim">United Kingdom</span></p>
      </div>
      <div className="right" data-aos="fade-left">
        <div className="mypic">
          <img src={myPhoto} alt="mypic" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;