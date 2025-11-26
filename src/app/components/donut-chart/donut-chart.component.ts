import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction, Category, CATEGORY_COLORS, TransactionType } from '../../models/transaction.model';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center">
      <div class="relative w-48 h-48">
        <svg viewBox="0 0 100 100" class="transform -rotate-90 w-full h-full">
          <circle *ngFor="let slice of slices"
            cx="50" cy="50" r="40"
            fill="transparent"
            [attr.stroke]="slice.color"
            stroke-width="20"
            [attr.stroke-dasharray]="slice.dashArray"
            [attr.stroke-dashoffset]="slice.offset"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span class="text-xs font-bold text-slate-500">Total Spent</span>
        </div>
      </div>

      <div class="w-full mt-6 space-y-2">
        <div *ngFor="let slice of slices" class="flex justify-between items-center text-sm">
           <div class="flex items-center gap-2">
             <div class="w-3 h-3 rounded-full" [style.background-color]="slice.color"></div>
             <span class="text-slate-300">{{ slice.name }}</span>
           </div>
           <span class="font-mono text-slate-100">\${{ slice.value.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  `
})
export class DonutChartComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];
  
  slices: any[] = [];

  ngOnChanges() {
    this.calculateSlices();
  }

  private calculateSlices() {
    const expenses = this.transactions.filter(t => t.type === TransactionType.EXPENSE);
    if (expenses.length === 0) {
      this.slices = [];
      return;
    }

    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    const categoryMap: Record<string, number> = {};

    expenses.forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    let currentOffset = 0;
    const circumference = 2 * Math.PI * 40; // r=40

    this.slices = Object.entries(categoryMap)
      .sort(([, a], [, b]) => b - a)
      .map(([name, value]) => {
        const percentage = value / total;
        const dashLength = percentage * circumference;
        const offset = -currentOffset; 
        currentOffset += dashLength;

        return {
          name,
          value,
          color: CATEGORY_COLORS[name as Category],
          dashArray: `${dashLength} ${circumference}`,
          offset
        };
      });
  }
}