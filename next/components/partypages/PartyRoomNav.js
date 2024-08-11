import React, { useState, useEffect } from 'react';
import styles from '@/styles/gw/_PartyRoomNav.module.scss';

const navItems = [
  { href: '#party', label: '揪團' },
  { href: '#roomInfo', label: '店家資訊' },
  { href: '#photo', label: '相片' },
  { href: '#toKnow', label: '注意事項' },
];

export default function PartyRoomNav() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        rootMargin: '-70px 0px -70% 0px',  // 調整這個值以考慮頂部 padding
        threshold: 0.3  // 當 30% 的元素可見時觸發
      }
    );

    navItems.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = document.querySelector(`.${styles.roomNav}`)?.offsetHeight || 0;
      const containerPadding = 60; // 頂部容器的 padding
      const scrollPosition = element.offsetTop - navHeight - containerPadding;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={styles.roomNav}>
      <ul>
        {navItems.map(({ href, label }) => (
          <li key={href} className={styles.navItem}>
            <a
              href={href}
              className={`${activeSection === href.slice(1) ? styles.navActive : ''} h6`}
              onClick={(e) => handleClick(e, href)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}