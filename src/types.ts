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

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export type ViewState = 'dashboard' | 'analytics' | 'add' | 'ai-insight';