import React, { useState, useEffect, useRef } from "react";
import "./FloatingChat.css"; // Corrected import path for CSS
import personalInfo from './personalInfo.json'; // Corrected import path for JSON

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = async () => {
    const message = inputMessage.trim();
    if (message) {
      const userMessage = { text: message, sender: "user", id: messages.length };
      setMessages([...messages, userMessage]);
      setInputMessage(""); // Clear input field

      const apiKey = getApiKey();
      if (!apiKey) {
        const botMessage = { text: "API key is missing.", sender: "bot", id: messages.length + 1 };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        return;
      }

      try {
        const response = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: getSystemMessage(message) },
              { role: 'system', content: 'Please respond concisely, like a real person.' },
              { role: 'user', content: message }
            ],
            max_tokens: 200,
            n: 1,
            stop: null,
            temperature: 0.7
          })
        });
        const data = await response.json();
        const botMessage = { text: data.choices[0].message.content.trim(), sender: "bot", id: messages.length + 1 };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error:', error);
        const botMessage = { text: "Sorry, something went wrong.", sender: "bot", id: messages.length + 1 };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getSystemMessage = (message) => {
    const isRussian = /[а-яА-ЯЁё]/.test(message);
    const name = isRussian ? 'Михаил' : personalInfo.personalInfo.name;
    return `You are ${name}, a ${personalInfo.personalInfo.title} with ${personalInfo.personalInfo.experience} of experience. You specialize in ${personalInfo.personalInfo.specialization}. Here is your CV:
    Skills:
    - Programming Languages & Frameworks: ${personalInfo.personalInfo.skills.programmingLanguages.join(', ')}
    - Frontend Technologies: ${personalInfo.personalInfo.skills.frontendTechnologies.join(', ')}
    - Build Tools & Libraries: ${personalInfo.personalInfo.skills.buildToolsAndLibraries.join(', ')}
    - Version Control: ${personalInfo.personalInfo.skills.versionControl.join(', ')}
    - Package Managers: ${personalInfo.personalInfo.skills.packageManagers.join(', ')}
    - Database: ${personalInfo.personalInfo.skills.database.join(', ')}

    Education:
    ${personalInfo.education.map(edu => `${edu.institution}, ${edu.course}, ${edu.location}, ${edu.duration}, ${edu.description}`).join('\n')}

    Portfolio:
    ${personalInfo.portfolio.map(proj => `${proj.name}: ${proj.link}, ${proj.description || ''}`).join('\n')}

    Work Experience:
    ${personalInfo.workExperience.map(exp => `${exp.position} at ${exp.company}, ${exp.duration}, Responsibilities: ${exp.responsibilities.join(', ')}`).join('\n')}
    `;
  };

  const fetchWithRetry = async (url, options, retries = 5, backoff = 500) => {
    for (let i = 0; i < retries; i++) {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      } else if (response.status === 429 && i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, i)));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  };

  const getApiKey = () => {
    return process.env.REACT_APP_API_KEY; // Updated to use REACT_APP_API_KEY
  };

  return (
    <div className="chat-container">
      <div className={`chat-box ${isOpen ? "open" : ""}`}>
        <div className="chat-header" onClick={toggleChat}>
          <button>
            {isOpen ? "–" : <img src="https://static.thenounproject.com/png/771010-200.png" alt="Open" style={{ width: '30px', height: '30px' }} />}
          </button>
        </div>

        {isOpen && (
          <div className="chat-body">
            <div className="messages-container">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                  <div className={`message ${msg.sender}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
              />
              <button onClick={sendMessage}>
                <img src="https://cdn-icons-png.flaticon.com/512/736/736212.png" alt="Send" style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingChat;
