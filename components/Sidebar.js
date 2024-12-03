export function Sidebar({ activeVersion, versions }) {
    return (
      <div className="sticky top-0 h-screen p-2">
        <div className="h-full flex flex-col items-center">
          <div className="w-0.5 h-full bg-gray-200 relative">
            {versions.map((version, index) => (
              <div
                key={version}
                className={`absolute left-1/2 w-2 h-2 rounded-full -translate-x-1/2 transition-colors duration-200 ${
                  activeVersion === version
                    ? 'bg-purple-600 ring-2 ring-purple-200'
                    : 'bg-gray-300'
                }`}
                style={{
                  top: `${(index + 1) * 200}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  