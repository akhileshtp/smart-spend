import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { MarkdownComponent } from 'ngx-markdown';

// Components
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';

// Services
import { TransactionService } from './services/transaction.service';
import { GeminiService } from './services/gemini.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    TransactionItemComponent, 
    AddModalComponent,
    DonutChartComponent,
    MarkdownComponent
  ],
  template: `
    <div class="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      <main class="max-w-md mx-auto min-h-screen relative px-4 pt-6 pb-24">
        
        <!-- DASHBOARD VIEW -->
        <div *ngIf="currentView === 'dashboard'" class="animate-fadeIn">
          <header class="flex justify-between items-center mb-6">
            <div>
              <h1 class="text-2xl font-bold text-white">Hello, User</h1>
              <p class="text-slate-400 text-sm">Welcome back to SmartSpend</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300">
              ME
            </div>
          </header>

          <!-- Stats Card -->
          <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 shadow-lg text-white mb-6 relative overflow-hidden">
            <div class="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-xl"></div>
            <div class="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 rounded-full bg-white opacity-10 blur-xl"></div>
            
            <p class="text-indigo-200 text-sm font-medium mb-1">Total Balance</p>
            <h2 class="text-4xl font-bold mb-6 tracking-tight">\${{ ts.balance() | number:'1.2-2' }}</h2>
            
            <div class="flex gap-4">
              <div class="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span class="text-xs text-indigo-100">Income</span>
                </div>
                <p class="font-semibold text-lg text-emerald-300">+\${{ ts.totalIncome() | number:'1.2-2' }}</p>
              </div>
              <div class="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm">
                <div class="flex items-center gap-2 mb-1">
                  <div class="w-2 h-2 rounded-full bg-red-400"></div>
                  <span class="text-xs text-indigo-100">Expenses</span>
                </div>
                <p class="font-semibold text-lg text-red-300">-\${{ ts.totalExpense() | number:'1.2-2' }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-slate-200">Recent Transactions</h3>
            <button (click)="currentView = 'analytics'" class="text-xs text-indigo-400 font-medium">See all</button>
          </div>

          <div *ngIf="ts.transactions().length === 0" class="text-center py-12 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
            <p class="text-slate-500 mb-2">No transactions yet.</p>
            <button (click)="isModalOpen = true" class="text-indigo-400 text-sm font-bold">Add your first spend</button>
          </div>

          <app-transaction-item 
            *ngFor="let tx of ts.transactions().slice(0, 5)" 
            [transaction]="tx" 
            (onDelete)="ts.deleteTransaction($event)">
          </app-transaction-item>
        </div>

        <!-- ANALYTICS VIEW -->
        <div *ngIf="currentView === 'analytics'" class="animate-fadeIn">
          <h2 class="text-2xl font-bold text-white mb-6">Analytics</h2>
          <div class="bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-700/50 mb-6">
             <h3 class="text-lg font-bold text-white mb-6">Spending Breakdown</h3>
             <app-donut-chart [transactions]="ts.transactions()"></app-donut-chart>
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-200 mb-4">History</h3>
            <app-transaction-item 
              *ngFor="let tx of ts.transactions()" 
              [transaction]="tx" 
              (onDelete)="ts.deleteTransaction($event)">
            </app-transaction-item>
          </div>
        </div>

        <!-- ADVISOR VIEW -->
        <div *ngIf="currentView === 'advisor'" class="animate-fadeIn">
           <div class="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-2xl font-bold mb-2 flex items-center gap-2">
                  <lucide-icon name="sparkles" class="text-yellow-300 fill-yellow-300" [size]="24"></lucide-icon>
                  Gemini Advisor
                </h2>
                <p class="text-violet-100 text-sm">
                  Get personalized insights on your spending habits powered by Google Gemini AI.
                </p>
              </div>
            </div>
            
            <button
              *ngIf="!analysis && !loading"
              (click)="generateInsight()"
              class="bg-white text-violet-700 font-bold py-3 px-6 rounded-xl shadow-md hover:bg-violet-50 transition-colors w-full sm:w-auto"
            >
              Generate Report
            </button>

            <div *ngIf="loading" class="flex items-center gap-3 text-white font-medium bg-white/20 p-4 rounded-xl animate-pulse">
               <lucide-icon name="loader-2" class="animate-spin"></lucide-icon>
               Analyzing your financial data...
            </div>
          </div>

          <div *ngIf="analysis" class="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl animate-fadeIn">
            <div class="flex items-center gap-3 mb-4 text-violet-400">
                <lucide-icon name="message-square-quote" [size]="24"></lucide-icon>
                <h3 class="text-lg font-bold">Analysis Report</h3>
            </div>
            <div class="prose prose-invert prose-sm max-w-none text-slate-300">
                <markdown [data]="analysis"></markdown>
            </div>
            <button 
                (click)="analysis = null"
                class="mt-6 text-sm text-slate-500 hover:text-white underline"
            >
                Clear Report
            </button>
        </div>
        </div>

      </main>

      <!-- BOTTOM NAVIGATION -->
      <div class="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 pb-safe pt-2 px-6 z-40">
        <div class="flex justify-between items-center max-w-md mx-auto h-16">
          <button (click)="currentView = 'dashboard'" class="flex flex-col items-center gap-1 p-2 rounded-xl transition-all" [class]="currentView === 'dashboard' ? 'text-indigo-400' : 'text-slate-500'">
            <lucide-icon name="home" [size]="24"></lucide-icon>
            <span class="text-[10px] font-medium">Home</span>
          </button>
          
          <button (click)="currentView = 'analytics'" class="flex flex-col items-center gap-1 p-2 rounded-xl transition-all" [class]="currentView === 'analytics' ? 'text-indigo-400' : 'text-slate-500'">
            <lucide-icon name="pie-chart" [size]="24"></lucide-icon>
            <span class="text-[10px] font-medium">Stats</span>
          </button>

          <div class="relative -top-5">
            <button 
              (click)="isModalOpen = true"
              class="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/40 text-white hover:scale-105 active:scale-95 transition-transform"
            >
              <lucide-icon name="plus" [size]="32"></lucide-icon>
            </button>
          </div>

          <button (click)="currentView = 'advisor'" class="flex flex-col items-center gap-1 p-2 rounded-xl transition-all" [class]="currentView === 'advisor' ? 'text-indigo-400' : 'text-slate-500'">
            <lucide-icon name="sparkles" [size]="24"></lucide-icon>
            <span class="text-[10px] font-medium">Advisor</span>
          </button>
          
          <div class="w-10"></div> 
        </div>
      </div>

      <app-add-modal 
        [isOpen]="isModalOpen" 
        (onClose)="isModalOpen = false"
        (onAdd)="handleAdd($event)"
      ></app-add-modal>
    </div>
  `
})
export class AppComponent {
  ts = inject(TransactionService);
  geminiService = inject(GeminiService);

  currentView: 'dashboard' | 'analytics' | 'advisor' = 'dashboard';
  isModalOpen = false;
  
  loading = false;
  analysis: string | null = null;

  handleAdd(event: any) {
    this.ts.addTransaction(event.amount, event.description, event.type, event.category);
  }

  async generateInsight() {
    this.loading = true;
    this.analysis = await this.geminiService.analyzeFinances(this.ts.transactions());
    this.loading = false;
  }
}