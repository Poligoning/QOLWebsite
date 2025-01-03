export default function ModCard({
  title,
  description,
  github,
  discord,
  downloads,
  tags,
  type,
}) {
  return (
    <div className="bg-[#0c1015] border border-white/10 rounded-lg p-4 hover:border-blue-500/40 transition-colors min-h-[200px] h-full flex flex-col">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white truncate">{title}</h2>
            <span
              className={`px-2 py-0.5 rounded text-xs ${type === 'Cheat' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}
            >
              {type}
            </span>
          </div>
          <p className="text-gray-400 mt-2 line-clamp-2">{description}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {github && (
            <button
              onClick={() => window.open(github, '_blank')}
              className="p-2 bg-[#151b23] rounded-lg hover:bg-[#1f2937] transition-colors"
            >
              {/* Ty Claude */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </button>
          )}
          {discord && (
            <button
              onClick={() => window.open(discord, '_blank')}
              className="p-2 bg-[#151b23] rounded-lg hover:bg-[#1f2937] transition-colors"
            >
              {/* Ty Claude */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => window.open(downloads, '_blank')}
        className="w-full mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Download
      </button>
    </div>
  );
}
