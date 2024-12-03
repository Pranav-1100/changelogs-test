import ChangelogPage from './ChangelogPage'
import { getChangelogs } from '@/lib/getChangelogs'

export default async function Home() {
  const changelogs = await getChangelogs()
  return <ChangelogPage changelogs={changelogs} />
}
