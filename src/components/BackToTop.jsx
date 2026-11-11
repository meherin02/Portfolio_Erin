import { useEffect, useState } from 'react';
import { Icon } from './icons.jsx';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'visible' : ''}`}
      aria-label="Back to top"
      title="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        })
      }
      tabIndex={visible ? 0 : -1}
    >
      <Icon name="arrowUp" size={18} />
    </button>
  );
}
