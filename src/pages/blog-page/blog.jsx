import React, { useEffect, useState, useRef } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './blog.css';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'telegramPosts');
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => doc.data());
      postList.sort((a, b) => b.timestamp - a.timestamp); // Sort posts by timestamp in descending order
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  useEffect(() => {

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    posts.forEach((post, index) => {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?7";
      script.async = true;
      script.setAttribute("data-telegram-post", `${post.telegram_channel}/${post.post_id}`);
      script.setAttribute("data-width", post.width || "100%");
      script.setAttribute("data-dark", post.dark_mode || "1");

      const div = document.createElement("div");
      div.className = "telegram-widget-container";
      div.setAttribute("data-aos", "fade-up");
      div.setAttribute("data-aos-delay", `${index * 200}`);
      div.appendChild(script);

      if (containerRef.current) {
        containerRef.current.appendChild(div);
      }
    });
    AOS.refresh();
  }, [posts]);

  return (
    <div className="blog-container" ref={containerRef}></div>
  );
}

export default BlogPage;
