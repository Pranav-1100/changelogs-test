import { format } from 'date-fns';

export function ChangelogEntry({
  version,
  date,
  title,
  tags,
  content,
  sections
}) {
  return (
    <article id={version} className="py-8 first:pt-8 border-b border-gray-200 last:border-0">
      <div className="flex items-center gap-3 mb-4">
        <time className="text-sm text-gray-600" suppressHydrationWarning>
          {format(new Date(date), 'MMMM d, yyyy')}
        </time>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <div 
          className="text-base text-gray-700 leading-relaxed mb-8 markdown-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                {section.title}
              </h3>
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
