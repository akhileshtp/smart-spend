import { Injectable, signal, computed, effect } from '@angular/core';
import { Transaction, TransactionType, Category } from '../models/transaction.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // Primary State
  readonly transactions = signal<Transaction[]>([]);

  // Computed State (Derived)
  readonly totalIncome = computed(() => 
    this.transactions()
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly totalExpense = computed(() => 
    this.transactions()
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly balance = computed(() => this.totalIncome() - this.totalExpense());

  constructor() {
    // Load from LocalStorage on init
    const saved = localStorage.getItem('smartspend_transactions');
    if (saved) {
      this.transactions.set(JSON.parse(saved));
    }

    // Save to LocalStorage whenever transactions change
    effect(() => {
      localStorage.setItem('smartspend_transactions', JSON.stringify(this.transactions()));
    });
  }

  addTransaction(amount: number, description: string, type: TransactionType, category: Category) {
    const newTx: Transaction = {
      id: uuidv4(),
      amount,
      description,
      type,
      category,
      date: new Date().toISOString()
    };
    this.transactions.update(prev => [newTx, ...prev]);
  }

  deleteTransaction(id: string) {
    if(confirm('Delete this transaction?')) {
      this.transactions.update(prev => prev.filter(t => t.id !== id));
    }
  }
}