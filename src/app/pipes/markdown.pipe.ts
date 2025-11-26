import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  async transform(value: string | null): Promise<string> {
    if (!value) return '';
    // marked.parse can be sync or async depending on options, but treating as promise is safer for future-proofing
    return marked.parse(value) as string;
  }
}