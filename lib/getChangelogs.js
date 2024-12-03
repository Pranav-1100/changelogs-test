import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSanitize from 'rehype-sanitize'

export async function getChangelogs() {
  const changelogsDirectory = path.join(process.cwd(), 'changelogs')
  const fileNames = fs.readdirSync(changelogsDirectory)
  
  const changelogs = await Promise.all(fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(async fileName => {
      const fullPath = path.join(changelogsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Split content into sections
      const sections = []
      let currentSection = null
      let mainContent = []
      
      const lines = content.trim().split('\n')
      let currentSectionContent = []
      
      for (const line of lines) {
        if (line.startsWith('## ')) {
          if (currentSection) {
            // Process the previous section's content
            const processedContent = await processMarkdown(currentSectionContent.join('\n'))
            sections.push({
              title: currentSection,
              content: processedContent
            })
            currentSectionContent = []
          }
          currentSection = line.replace('## ', '').trim()
        } else if (currentSection) {
          currentSectionContent.push(line)
        } else if (line.trim()) {
          mainContent.push(line)
        }
      }
      
      // Process the last section if exists
      if (currentSection) {
        const processedContent = await processMarkdown(currentSectionContent.join('\n'))
        sections.push({
          title: currentSection,
          content: processedContent
        })
      }

      // Process main content
      const processedMainContent = await processMarkdown(mainContent.join('\n'))

      return {
        version: data.version,
        date: data.date,
        title: data.title || '',
        tags: data.tags || [],
        content: processedMainContent,
        sections
      }
    }))

  return changelogs.sort((a, b) => new Date(b.date) - new Date(a.date))
}

async function processMarkdown(content) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)  // Enables tables, strikethrough, and other GFM features
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize)
    .use(rehypeStringify)

  const result = await processor.process(content)
  return result.toString()
}

