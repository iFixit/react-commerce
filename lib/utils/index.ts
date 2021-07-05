export function capitalize(text: string): string {
   return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export function assertNever(x: never): never {
   throw new Error('Unexpected object: ' + x);
}
