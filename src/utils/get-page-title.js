import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Kanban'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title}`
  }
  return `${title}`
}
