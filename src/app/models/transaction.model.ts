export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum Category {
  FOOD = 'Food & Dining',
  TRANSPORT = 'Transportation',
  HOUSING = 'Housing & Utilities',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health & Fitness',
  SHOPPING = 'Shopping',
  SALARY = 'Salary',
  INVESTMENT = 'Investment',
  OTHER = 'Other',
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string; // ISO String
  type: TransactionType;
  category: Category;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.FOOD]: '#f59e0b',
  [Category.TRANSPORT]: '#3b82f6',
  [Category.HOUSING]: '#6366f1',
  [Category.ENTERTAINMENT]: '#ec4899',
  [Category.HEALTH]: '#10b981',
  [Category.SHOPPING]: '#8b5cf6',
  [Category.SALARY]: '#22c55e',
  [Category.INVESTMENT]: '#06b6d4',
  [Category.OTHER]: '#94a3b8',
};