import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { LucideAngularModule, Home, PieChart, Sparkles, Plus, ArrowUpRight, ArrowDownLeft, Trash2, X, Check, Loader2, MessageSquareQuote } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(
      MarkdownModule.forRoot(),
      LucideAngularModule.pick({ Home, PieChart, Sparkles, Plus, ArrowUpRight, ArrowDownLeft, Trash2, X, Check, Loader2, MessageSquareQuote })
    )
  ]
};