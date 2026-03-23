/** Mock 区域看板数据（等成员B的API就绪后替换此文件） */

export interface ItemStats {
  inStock: number   // 在库
  borrowed: number  // 借出
  inUse: number     // 使用中
  expired: number   // 过期/预警
}

export interface BorrowedItem {
  id: string
  name: string
  borrower: string
  borrowDate: string  // 'YYYY-MM-DD'
  dueDate: string     // 'YYYY-MM-DD'
  overdue: boolean
}

export interface InboundRecord {
  id: string
  name: string
  date: string        // 'YYYY-MM-DD'
  quantity: number
  unit: string
  operator: string
}

export interface ExpiryWarning {
  id: string
  name: string
  expiryDate: string  // 'YYYY-MM-DD'
  daysLeft: number    // 负数=已过期
  level: 'warning' | 'critical'  // warning=7~30天, critical=<7天或已过期
}

export interface RoomDashboard {
  stats: ItemStats
  borrowed: BorrowedItem[]
  inbound: InboundRecord[]
  expiryWarnings: ExpiryWarning[]
}

// ── Mock 数据（以 2026-03-23 为基准） ────────────────────────────────────────

const DATA: Record<string, RoomDashboard> = {
  training: {
    stats: { inStock: 3, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-t01', name: '培训教材套装',  date: '2026-03-18', quantity: 1,  unit: '套', operator: '王静' },
      { id: 'ib-t02', name: '白板笔套装',    date: '2026-03-10', quantity: 2,  unit: '盒', operator: '王静' },
    ],
    expiryWarnings: [],
  },

  engineering: {
    stats: { inStock: 6, borrowed: 1, inUse: 0, expired: 0 },
    borrowed: [
      {
        id: 'bw-e01',
        name: '电钻套装',
        borrower: '张明',
        borrowDate: '2026-03-20',
        dueDate: '2026-03-26',
        overdue: false,
      },
    ],
    inbound: [
      { id: 'ib-e01', name: '万用表',           date: '2026-02-10', quantity: 1, unit: '台', operator: '李工' },
      { id: 'ib-e02', name: '维修工具箱（A）',  date: '2026-01-15', quantity: 1, unit: '套', operator: '李工' },
    ],
    expiryWarnings: [],
  },

  printroom: {
    stats: { inStock: 4, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-p01', name: 'A4纸（500张/包）×10', date: '2026-03-20', quantity: 10, unit: '包', operator: '刘秘' },
      { id: 'ib-p02', name: '墨盒套装',             date: '2026-03-05', quantity: 2,  unit: '套', operator: '刘秘' },
    ],
    expiryWarnings: [],
  },

  pantry: {
    stats: { inStock: 4, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-pa01', name: '咖啡胶囊盒',   date: '2026-03-19', quantity: 2,  unit: '盒', operator: '前台' },
      { id: 'ib-pa02', name: '一次性纸杯',   date: '2026-03-19', quantity: 5,  unit: '包', operator: '前台' },
      { id: 'ib-pa03', name: '茶叶罐（绿茶）', date: '2026-03-01', quantity: 1, unit: '罐', operator: '前台' },
    ],
    expiryWarnings: [],
  },

  office1: {
    stats: { inStock: 3, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-o1-01', name: '合同档案夹',   date: '2026-03-15', quantity: 5,  unit: '个', operator: '人事部' },
      { id: 'ib-o1-02', name: '考勤记录本',   date: '2026-03-01', quantity: 2,  unit: '本', operator: '人事部' },
    ],
    expiryWarnings: [],
  },

  reception: {
    stats: { inStock: 3, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-rc01', name: '临时通行证',   date: '2026-03-21', quantity: 20, unit: '张', operator: '前台' },
      { id: 'ib-rc02', name: '访客登记本',   date: '2026-03-08', quantity: 1,  unit: '本', operator: '前台' },
    ],
    expiryWarnings: [],
  },

  lab: {
    stats: { inStock: 4, borrowed: 0, inUse: 1, expired: 1 },
    borrowed: [],
    inbound: [
      { id: 'ib-lb01', name: 'ELISA试剂盒（鼠）',  date: '2026-03-17', quantity: 2, unit: '盒', operator: '陈研' },
      { id: 'ib-lb02', name: '蛋白定量试剂盒',      date: '2026-03-10', quantity: 1, unit: '盒', operator: '陈研' },
    ],
    expiryWarnings: [
      {
        id: 'ew-lb01',
        name: 'ELISA试剂盒（鼠）',
        expiryDate: '2026-03-29',
        daysLeft: 6,
        level: 'critical',
      },
    ],
  },

  office2: {
    stats: { inStock: 3, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-o2-01', name: '打印机耗材',   date: '2026-03-14', quantity: 3, unit: '盒', operator: '财务部' },
      { id: 'ib-o2-02', name: '票据盒',       date: '2026-02-20', quantity: 2, unit: '个', operator: '财务部' },
    ],
    expiryWarnings: [],
  },

  microlab: {
    stats: { inStock: 4, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-ml01', name: '培养皿套装',   date: '2026-03-19', quantity: 3, unit: '套', operator: '陈研' },
      { id: 'ib-ml02', name: '灭菌锅',       date: '2026-01-05', quantity: 1, unit: '台', operator: '陈研' },
    ],
    expiryWarnings: [],
  },

  restricted: {
    stats: { inStock: 0, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [],
    expiryWarnings: [],
  },

  office3: {
    stats: { inStock: 3, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-o3-01', name: '品控标准手册',   date: '2026-02-20', quantity: 1, unit: '册', operator: '品控部' },
      { id: 'ib-o3-02', name: '质检报告夹',     date: '2026-02-10', quantity: 5, unit: '个', operator: '品控部' },
    ],
    expiryWarnings: [],
  },

  cold: {
    stats: { inStock: 4, borrowed: 0, inUse: 0, expired: 2 },
    borrowed: [],
    inbound: [
      { id: 'ib-cl01', name: '冷冻原料-牛肉（批次240301）', date: '2026-03-01', quantity: 50, unit: 'kg', operator: '仓管李' },
      { id: 'ib-cl02', name: '冷冻原料-猪肉（批次240302）', date: '2026-03-04', quantity: 40, unit: 'kg', operator: '仓管李' },
    ],
    expiryWarnings: [
      {
        id: 'ew-cl01',
        name: '冷冻原料-牛肉（批次240301）',
        expiryDate: '2026-04-04',
        daysLeft: 12,
        level: 'warning',
      },
      {
        id: 'ew-cl02',
        name: '冷冻原料-猪肉（批次240302）',
        expiryDate: '2026-04-07',
        daysLeft: 15,
        level: 'warning',
      },
    ],
  },

  smallstore: {
    stats: { inStock: 2, borrowed: 0, inUse: 0, expired: 2 },
    borrowed: [],
    inbound: [
      { id: 'ib-ss01', name: '纸箱（平板）',     date: '2025-12-10', quantity: 20, unit: '个', operator: '仓管李' },
      { id: 'ib-ss02', name: '封口胶带',         date: '2025-11-05', quantity: 10, unit: '卷', operator: '仓管李' },
    ],
    expiryWarnings: [
      {
        id: 'ew-ss01',
        name: '备用包装袋（小）',
        expiryDate: '2026-02-06',
        daysLeft: -45,
        level: 'critical',
      },
      {
        id: 'ew-ss02',
        name: '标签纸卷',
        expiryDate: '2026-03-11',
        daysLeft: -12,
        level: 'critical',
      },
    ],
  },

  warehouse: {
    stats: { inStock: 5, borrowed: 1, inUse: 0, expired: 0 },
    borrowed: [
      {
        id: 'bw-wh01',
        name: '食品添加剂套装',
        borrower: '李仓',
        borrowDate: '2026-03-18',
        dueDate: '2026-03-28',
        overdue: false,
      },
    ],
    inbound: [
      { id: 'ib-wh01', name: '大豆蛋白粉（5kg×20袋）', date: '2026-02-28', quantity: 20, unit: '袋', operator: '仓管李' },
      { id: 'ib-wh02', name: '玉米淀粉箱',              date: '2026-02-20', quantity: 10, unit: '箱', operator: '仓管李' },
    ],
    expiryWarnings: [],
  },

  kennel: {
    stats: { inStock: 4, borrowed: 0, inUse: 1, expired: 1 },
    borrowed: [],
    inbound: [
      { id: 'ib-kn01', name: '犬粮（在用）-K系列',   date: '2026-03-22', quantity: 10, unit: '袋', operator: '饲养员赵' },
      { id: 'ib-kn02', name: '犬只健康档案夹',       date: '2026-03-15', quantity: 3,  unit: '册', operator: '兽医王' },
    ],
    expiryWarnings: [
      {
        id: 'ew-kn01',
        name: '防疫药品柜-疫苗A',
        expiryDate: '2026-03-28',
        daysLeft: 5,
        level: 'critical',
      },
    ],
  },

  finished: {
    stats: { inStock: 4, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-fi01', name: '犬粮成品（军警版）批次2403', date: '2026-03-20', quantity: 50, unit: '箱', operator: '生产班长' },
      { id: 'ib-fi02', name: '犬粮成品（民用版）批次2403', date: '2026-03-20', quantity: 30, unit: '箱', operator: '生产班长' },
    ],
    expiryWarnings: [],
  },

  cook: {
    stats: { inStock: 3, borrowed: 0, inUse: 1, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-ck01', name: '蒸汽阀门工具',   date: '2026-03-18', quantity: 1, unit: '套', operator: '生产主管' },
      { id: 'ib-ck02', name: '温度传感器',     date: '2026-02-25', quantity: 2, unit: '个', operator: '工程部' },
    ],
    expiryWarnings: [],
  },

  fill: {
    stats: { inStock: 3, borrowed: 0, inUse: 1, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-fl01', name: '计量秤',        date: '2026-03-21', quantity: 1, unit: '台', operator: '生产主管' },
      { id: 'ib-fl02', name: '灌装管道工具',  date: '2026-03-10', quantity: 1, unit: '套', operator: '工程部' },
    ],
    expiryWarnings: [],
  },

  emulsify: {
    stats: { inStock: 3, borrowed: 0, inUse: 1, expired: 1 },
    borrowed: [],
    inbound: [
      { id: 'ib-em01', name: '乳化剂',          date: '2026-02-15', quantity: 5, unit: 'L',  operator: '仓管李' },
      { id: 'ib-em02', name: '搅拌桶（50L）',   date: '2026-01-20', quantity: 2, unit: '桶', operator: '工程部' },
    ],
    expiryWarnings: [
      {
        id: 'ew-em01',
        name: '乳化剂',
        expiryDate: '2026-03-31',
        daysLeft: 8,
        level: 'warning',
      },
    ],
  },

  prep: {
    stats: { inStock: 4, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-pr01', name: '肉类原料（冷藏）',   date: '2026-03-22', quantity: 30, unit: 'kg', operator: '备料员' },
      { id: 'ib-pr02', name: '蔬菜食材',           date: '2026-03-22', quantity: 15, unit: 'kg', operator: '备料员' },
    ],
    expiryWarnings: [],
  },

  wash: {
    stats: { inStock: 4, borrowed: 0, inUse: 0, expired: 0 },
    borrowed: [],
    inbound: [
      { id: 'ib-ws01', name: '消毒液桶',       date: '2026-03-19', quantity: 4, unit: '桶', operator: '清洁组' },
      { id: 'ib-ws02', name: '清洁剂（工业）', date: '2026-03-12', quantity: 6, unit: '桶', operator: '清洁组' },
    ],
    expiryWarnings: [],
  },
}

const DEFAULT_DASHBOARD: RoomDashboard = {
  stats: { inStock: 0, borrowed: 0, inUse: 0, expired: 0 },
  borrowed: [],
  inbound: [],
  expiryWarnings: [],
}

export function getRoomDashboard(roomId: string): RoomDashboard {
  return DATA[roomId] ?? DEFAULT_DASHBOARD
}
