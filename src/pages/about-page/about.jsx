import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './about.css';
import myPhoto from './media/my-photo.webp';

function AboutPage() {
  const [activeButton, setActiveButton] = useState('Tech Stack');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const aboutMe = `
    Hi! My name is Mykhailo Kuptsov, and I am a web developer from Ukraine who
    moved to London, United Kingdom. I have 1 year of experience as frontend developer
    in freelance. For me, creating websites is more than just a job - it’s about creating
    experiences that make people’s daily online routines more enjoyable and seamless.

    My goal is to make your website user-friendly yet visually appealing. I ensure that
    it doesn’t only stand out but also leaves a lasting impression. I focus on making your
    product recognisable while making the website attractive and easy to navigate. I am
    passionate about conveying your message and identity in the most creative and impactful way.
    
    If you are interested in hiring me, feel free to reach out via the contact information listed!
  `;

  const techStack = [
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: "Advanced" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: "Advanced" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: "Advanced" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: "Intermediate" },
    { name: "VueJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", level: "Intermediate" },
    { name: "NodeJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg", level: "Advanced" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", level: "Advanced" },
    { name: "Typescript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", level: "Advanced" },
    { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: "Advanced" },
    { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg", level: "Advanced" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", level: "Intermediate" },
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", level: "Intermediate" },
  ];

  const tools = [
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Github", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
    { name: "Npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
    { name: "Webpack", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
    { name: "ESLint", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" },
    { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  ];

  return (
    <div className='about-container'>
      <div className="gray-container">
        <div className="headline-container" data-aos="fade-right">
          <h1 className='about-header'>About Me </h1>
          <span className="about-underline"></span>
        </div>
        <div className="about-grid" data-aos="fade-left">
          <div className="about-mypic" data-aos="flip-left">
            <img src={myPhoto} alt="mypic" loading="lazy" />
          </div>
          <p className='about-text' data-aos="fade-up">
            {aboutMe.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line.trim()}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      <div className="skills-container">
        <span className="about-underline"></span>
        <h1 className='about-header'>Skills </h1>
      </div>
      <ul className='skills-menu'>
        <li>
          <button
            className={`skills-button ${activeButton === 'Tech Stack' ? 'active' : ''}`}
            onClick={() => setActiveButton('Tech Stack')}
          >
            Tech Stack
          </button>
        </li>
        <li>
          <button
            className={`skills-button ${activeButton === 'Tools' ? 'active' : ''}`}
            onClick={() => setActiveButton('Tools')}
          >
            Tools
          </button>
        </li>
      </ul>
      {activeButton === 'Tech Stack' && (
        <div className='tech-stack-grid'>
          {techStack.map((tech, index) => (
            <div className='tech-card' key={index}>
              <img src={tech.icon} alt={tech.name} className='tech-icon' />
              <div className='tech-info'>
                <p>{tech.name}</p>
                <p className='tech-level fade-in'>{tech.level}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeButton === 'Tools' && (
        <div className='tech-stack-grid'>
          {tools.map((tool, index) => (
            <div className='tech-card' key={index}>
              <img src={tool.icon} alt={tool.name} className='tech-icon' />
              <div className='tech-info'>
                <p>{tool.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutPage;