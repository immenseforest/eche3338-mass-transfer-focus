import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
export const activeVisitors = sqliteTable('active_visitors', {
  addressHash: text('address_hash').primaryKey(),
  lastSeen: integer('last_seen').notNull()
}, table => [index('idx_active_visitors_last_seen').on(table.lastSeen)]);
