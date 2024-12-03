export function TableOfContents({ entries, activeVersion, entryHeights }) {
  return (
    <nav className="pt-8 relative">
      {/* Timeline bar */}
      <div className="absolute left-[7px] h-full w-0.5 bg-gray-200" />
      
      <ul className="relative">
        {entries.map((entry, index) => (
          <li 
            key={entry.version}
            className="relative"
            style={{
              height: entryHeights[entry.version] || 'auto',
              minHeight: '100px'
            }}
          >
            {/* Timeline dot */}
            <div 
              className={`absolute left-0 w-3.5 h-3.5 rounded-full border-2 ${
                activeVersion === entry.version 
                  ? 'border-purple-600 bg-white' 
                  : 'border-gray-200 bg-white'
              }`}
            />
            
            <div className="sticky top-28 pl-8">
              <a 
                href={`#${entry.version}`} 
                className="block group"
              >
                <div className="text-base font-semibold text-gray-900 group-hover:text-blue-600">
                  {entry.title ? `${entry.title} ${entry.version}` : entry.version}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}