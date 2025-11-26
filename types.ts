
export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO string
  type: TransactionType;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const CATEGORIES: ExpenseCategory[] = [
  { id: 'food', name: 'Food & Dining', color: '#ef4444', icon: 'utensils' },
  { id: 'transport', name: 'Transport', color: '#f97316', icon: 'car' },
  { id: 'shopping', name: 'Shopping', color: '#8b5cf6', icon: 'shopping-bag' },
  { id: 'entertainment', name: 'Entertainment', color: '#ec4899', icon: 'film' },
  { id: 'bills', name: 'Bills & Utilities', color: '#3b82f6', icon: 'zap' },
  { id: 'health', name: 'Health', color: '#10b981', icon: 'heart-pulse' },
  { id: 'income', name: 'Income', color: '#22c55e', icon: 'wallet' },
  { id: 'other', name: 'Other', color: '#64748b', icon: 'circle-help' },
];
