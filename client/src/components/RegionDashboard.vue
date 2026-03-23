<template>
  <div class="dashboard">
    <!-- 头部：区域名 + 状态标签 -->
    <div class="dash-header">
      <span class="zone-dot" :style="{ background: zoneColor }" />
      <span class="room-title">{{ room.name }}</span>
      <van-tag :type="statusTagType(room.dataStatus)" size="small" class="status-tag">
        {{ statusLabel(room.dataStatus) }}
      </van-tag>
    </div>
    <div class="room-zone-name">{{ room.zone ? zoneNameMap[room.zone] ?? room.zone : '' }}</div>

    <van-divider style="margin: 8px 0" />

    <!-- 受限区域 -->
    <div v-if="room.restricted" class="restricted-notice">
      <van-icon name="lock" color="#c62828" />
      <span>该区域为受限区域，物品信息仅限授权人员查看</span>
    </div>

    <template v-else>
      <!-- 统计卡片行 -->
      <div class="stats-row">
        <div class="stat-card" style="border-left-color:#4caf50">
          <span class="stat-num">{{ data.stats.inStock }}</span>
          <span class="stat-label">在库</span>
        </div>
        <div class="stat-card" style="border-left-color:#ff9800">
          <span class="stat-num">{{ data.stats.borrowed }}</span>
          <span class="stat-label">借出</span>
        </div>
        <div class="stat-card" style="border-left-color:#1976d2">
          <span class="stat-num">{{ data.stats.inUse }}</span>
          <span class="stat-label">使用中</span>
        </div>
        <div class="stat-card" style="border-left-color:#f44336">
          <span class="stat-num">{{ data.stats.expired }}</span>
          <span class="stat-label">预警</span>
        </div>
      </div>

      <!-- 详情标签页 -->
      <van-tabs v-model:active="activeTab" shrink sticky :offset-top="0">
        <!-- 借出列表 -->
        <van-tab title="借出列表" name="borrowed">
          <van-empty v-if="data.borrowed.length === 0" description="暂无借出记录" image-size="60" />
          <van-cell-group v-else inset style="margin-top:8px">
            <van-cell
              v-for="item in data.borrowed"
              :key="item.id"
              :title="item.name"
              :label="`借用人：${item.borrower} · 借出：${item.borrowDate}`"
            >
              <template #right-icon>
                <van-tag :type="item.overdue ? 'danger' : 'warning'" plain size="small">
                  {{ item.overdue ? '已逾期' : `还至 ${item.dueDate}` }}
                </van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </van-tab>

        <!-- 入库记录 -->
        <van-tab title="入库记录" name="inbound">
          <van-empty v-if="data.inbound.length === 0" description="暂无入库记录" image-size="60" />
          <van-cell-group v-else inset style="margin-top:8px">
            <van-cell
              v-for="rec in data.inbound"
              :key="rec.id"
              :title="rec.name"
              :label="`入库：${rec.date} · 经手：${rec.operator}`"
            >
              <template #right-icon>
                <span class="inbound-qty">{{ rec.quantity }} {{ rec.unit }}</span>
              </template>
            </van-cell>
          </van-cell-group>
        </van-tab>

        <!-- 过期预警 -->
        <van-tab title="过期预警" name="expiry">
          <van-empty v-if="data.expiryWarnings.length === 0" description="暂无过期预警" image-size="60" />
          <van-cell-group v-else inset style="margin-top:8px">
            <van-cell
              v-for="warn in data.expiryWarnings"
              :key="warn.id"
              :title="warn.name"
              :label="`到期日：${warn.expiryDate}`"
            >
              <template #right-icon>
                <van-tag :type="warn.level === 'critical' ? 'danger' : 'warning'" size="small">
                  {{ warn.daysLeft <= 0 ? `已过期${Math.abs(warn.daysLeft)}天` : `${warn.daysLeft}天后到期` }}
                </van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getRoomDashboard } from '@/services/mockRoomData'
import type { RoomDashboard } from '@/services/mockRoomData'
import { statusTagType, statusLabel } from '@/composables/useItemStatus'

// ── Types ────────────────────────────────────────────────────────────────────

interface Item {
  id: string
  name: string
  location: string
  status: string
}

interface Room {
  id: string
  name: string
  subLabel?: string
  zone: string
  restricted?: boolean
  x: number
  y: number
  width: number
  height: number
  dataStatus: 'fresh' | 'stale' | 'expired'
  items: Item[]
}

// ── Props ────────────────────────────────────────────────────────────────────

const props = defineProps<{
  room: Room
  zoneColor: string
}>()

// ── State ────────────────────────────────────────────────────────────────────

const activeTab = ref('borrowed')

const data = computed<RoomDashboard>(() => getRoomDashboard(props.room.id))

// 区域名称映射（与 map-data.json 中 zone id 对应）
const zoneNameMap: Record<string, string> = {
  production: '生产区',
  lab: '实验室区',
  storage: '仓储区',
  kennel: '犬舍区',
  office: '办公区',
}
</script>

<style scoped>
.dashboard {
  height: 100%;
  overflow-y: auto;
  padding: 16px 0;
}

/* 头部 */
.dash-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  margin-bottom: 4px;
}

.zone-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.room-title {
  font-size: 18px;
  font-weight: 600;
  flex: 1;
  color: #1a1a1a;
}

.status-tag {
  flex-shrink: 0;
}

.room-zone-name {
  font-size: 12px;
  color: #999;
  padding: 0 16px;
  margin-left: 20px;
}

/* 受限提示 */
.restricted-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 16px;
  padding: 12px;
  background: #fff3f3;
  border-radius: 8px;
  color: #c62828;
  font-size: 13px;
}

/* 统计卡片 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 0 16px 12px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  background: #f8f8f8;
  border-radius: 8px;
  border-left: 3px solid #ccc;
}

.stat-num {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: #888;
  margin-top: 4px;
}

/* 入库数量 */
.inbound-qty {
  font-size: 12px;
  color: #555;
  white-space: nowrap;
}
</style>
