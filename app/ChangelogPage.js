'use client'
import { ChangelogEntry } from '@/components/ChangelogEntry'
import { TableOfContents } from '@/components/TableOfContents'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'

export default function ChangelogPage({ changelogs }) {
  const [activeVersion, setActiveVersion] = useState(null);
  const [entryHeights, setEntryHeights] = useState({});

  useEffect(() => {
    const calculateHeights = () => {
      const heights = {};
      changelogs.forEach(entry => {
        const element = document.getElementById(entry.version);
        if (element) {
          heights[entry.version] = element.offsetHeight;
        }
      });
      setEntryHeights(heights);
    };

    calculateHeights();
    window.addEventListener('resize', calculateHeights);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveVersion(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -85% 0px'
      }
    );

    document.querySelectorAll('article[id]').forEach(article => {
      observer.observe(article);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculateHeights);
    };
  }, [changelogs]);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <header className="max-w-[1280px] mx-auto px-4 h-16 flex items-center">
          <h1 className="text-xl font-semibold">Changelog</h1>
        </header>
      </div>

      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex gap-6">
          <div className="w-80 sticky top-16 self-start">
            <TableOfContents 
              entries={changelogs} 
              activeVersion={activeVersion}
              entryHeights={entryHeights}
            />
          </div>
          
          <div className="min-w-0 flex-1">
            {changelogs.map((entry) => (
              <ChangelogEntry key={entry.version} {...entry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}