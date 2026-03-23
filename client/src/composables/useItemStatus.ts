/** 物品和数据状态的显示辅助函数，供 Map.vue、RegionDashboard.vue 等共用 */

export function statusColor(s: string): string {
  if (s === 'fresh')  return '#4caf50'
  if (s === 'stale')  return '#ff9800'
  return '#f44336'
}

export function statusLabel(s: string): string {
  if (s === 'fresh')  return '数据新鲜'
  if (s === 'stale')  return '数据较旧'
  return '数据过期'
}

export function statusTagType(s: string): string {
  if (s === 'fresh')  return 'success'
  if (s === 'stale')  return 'warning'
  return 'danger'
}

export function itemTagType(s: string): string {
  if (s === '在库')   return 'success'
  if (s === '借出')   return 'warning'
  if (s === '使用中') return 'primary'
  return 'default'
}
