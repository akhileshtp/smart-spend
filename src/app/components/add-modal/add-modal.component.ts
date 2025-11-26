import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { TransactionType, Category } from '../../models/transaction.model';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div class="bg-slate-900 w-full max-w-md rounded-t-2xl sm:rounded-2xl border-t sm:border border-slate-700 p-6 animate-slideUp">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-white">New Transaction</h2>
          <button (click)="onClose.emit()" class="p-2 hover:bg-slate-800 rounded-full text-slate-400">
            <lucide-icon name="x" [size]="24"></lucide-icon>
          </button>
        </div>

        <form (ngSubmit)="handleSubmit()" class="space-y-5">
          <!-- Toggle Type -->
          <div class="flex bg-slate-800 p-1 rounded-lg">
            <button
              type="button"
              (click)="type = 'EXPENSE'"
              class="flex-1 py-2 rounded-md text-sm font-medium transition-colors"
              [class]="type === 'EXPENSE' ? 'bg-red-500/20 text-red-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'"
            >
              Expense
            </button>
            <button
              type="button"
              (click)="type = 'INCOME'"
              class="flex-1 py-2 rounded-md text-sm font-medium transition-colors"
              [class]="type === 'INCOME' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'"
            >
              Income
            </button>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">Amount</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                step="0.01"
                required
                [(ngModel)]="amount"
                name="amount"
                class="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500 text-lg font-semibold"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">Description</label>
            <input
              type="text"
              required
              [(ngModel)]="description"
              name="description"
              class="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
              placeholder="What is this for?"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-400 mb-1">Category</label>
            <select
              [(ngModel)]="category"
              name="category"
              class="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
            </select>
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-4 transition-colors"
          >
            <lucide-icon name="check" [size]="20"></lucide-icon>
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  `
})
export class AddModalComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onAdd = new EventEmitter<{amount: number, description: string, type: TransactionType, category: Category}>();

  amount: string = '';
  description: string = '';
  type: string = 'EXPENSE'; // String matching Enum key
  category: Category = Category.FOOD;
  
  categories = Object.values(Category);

  handleSubmit() {
    if (!this.amount || !this.description) return;
    
    this.onAdd.emit({
      amount: parseFloat(this.amount),
      description: this.description,
      type: this.type as TransactionType,
      category: this.category
    });

    // Reset
    this.amount = '';
    this.description = '';
    this.onClose.emit();
  }
}