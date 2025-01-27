import './contact.css';

function ContactPage() {
  const contacts = [
    {
      name: "Telegram",
      description: "@ellworts",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png",
      link: "https://t.me/ellworts"
    },
    {
      name: "WhatsApp",
      description: "+447767853122",
      icon: "https://img.icons8.com/?size=100&id=16713&format=png&color=000000",
      link: "https://wa.me/447767853122"
    },
    {
      name: "LinkedIN",
      description: "Mykhailo Kuptsov",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
      link: "https://www.linkedin.com/in/ellworts/"
    },
    {
      name: "Gmail",
      description: "kuptsov5162@gmail.com",
      icon: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
      link: "mailto:kuptsov5162@gmail.com"
    },
    {
      name: "Instagram",
      description: "@dividedmeepo",
      icon: "https://img.icons8.com/?size=512&id=Xy10Jcu1L2Su&format=png",
      link: "https://www.instagram.com/dividedmeepo/"
    },
    {
      name: "Phone",
      description: "+447767853122",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Mobile-Smartphone-icon.png",
      link: "tel:+447767853122"
    },
  ];

  return (
    <div className='contact-container' data-aos="fade-up">
      <div className="contactInfo-grid">
        <h1 className="contactInfo-heading">Contact Me</h1>
        <h2 className="contactInfo-text">Get in touch to bring your ideas to life</h2>
      </div>

      <div className="contact-links" data-aos="fade-up">
        {contacts.map((contact, index) => (
          <a key={index} href={contact.link} target="_blank" rel="noopener noreferrer" className="contact-card">
            <img src={contact.icon} alt={contact.name} className="contact-icon" />
            <p className='link-text'>{contact.name}</p>
            <p className='link-description'>{contact.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default ContactPage;