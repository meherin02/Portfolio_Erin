import { useEffect, useState } from 'react';

/**
 * Tracks which page section is currently in the reading zone of the viewport
 * so the navigation can highlight it.
 */
export default function useActiveSection(ids) {
  const key = ids.join('|');
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    for (const id of key.split('|')) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [key]);

  return active;
}
