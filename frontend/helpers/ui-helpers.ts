import snarkdown from 'snarkdown';

export function markdownToHTML(markdown: string): string {
   const preserveNewlines = markdown.trim().replace(/\n/g, '<br />');
   return snarkdown(preserveNewlines);
}
