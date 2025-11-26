import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  async transform(value: string | null): Promise<string> {
    if (!value) return '';
    const result = marked.parse(value);
    // Newer marked versions might return a Promise, handle both cases
    if (result instanceof Promise) {
      return await result;
    }
    return result;
  }
}