import { Category } from './types';

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.FOOD]: '#f59e0b', // Amber
  [Category.TRANSPORT]: '#3b82f6', // Blue
  [Category.HOUSING]: '#6366f1', // Indigo
  [Category.ENTERTAINMENT]: '#ec4899', // Pink
  [Category.HEALTH]: '#10b981', // Emerald
  [Category.SHOPPING]: '#8b5cf6', // Violet
  [Category.SALARY]: '#22c55e', // Green
  [Category.INVESTMENT]: '#06b6d4', // Cyan
  [Category.OTHER]: '#94a3b8', // Slate
};

export const INITIAL_TRANSACTIONS = [];