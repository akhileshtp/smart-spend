import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Transaction, TransactionType, CATEGORY_COLORS } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex items-center justify-between p-4 bg-slate-800 rounded-xl mb-3 shadow-sm border border-slate-700/50 hover:border-slate-600 transition-colors group">
      <div class="flex items-center gap-4">
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900"
          [style.color]="getCategoryColor()"
        >
          <lucide-icon [name]="isExpense ? 'arrow-up-right' : 'arrow-down-left'" [size]="20"></lucide-icon>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-slate-100">{{ item.description }}</h3>
          <p class="text-xs text-slate-400">{{ item.category }} • {{ item.date | date:'MMM d' }}</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="font-bold text-sm" [class.text-red-400]="isExpense" [class.text-emerald-400]="!isExpense">
          {{ isExpense ? '-' : '+' }}${{ item.amount | number:'1.2-2' }}
        </span>
        <button 
          (click)="onDelete.emit(item.id)"
          class="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
        >
          <lucide-icon name="trash-2" [size]="16"></lucide-icon>
        </button>
      </div>
    </div>
  `
})
export class TransactionItemComponent {
  @Input({ required: true }) item!: Transaction;
  @Output() onDelete = new EventEmitter<string>();

  get isExpense(): boolean {
    return this.item?.type === TransactionType.EXPENSE;
  }

  getCategoryColor(): string {
    return this.item ? CATEGORY_COLORS[this.item.category] : '#fff';
  }
}