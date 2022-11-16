export function clearLastLine() {
   process.stdout.moveCursor(0, -1);
   process.stdout.clearLine(0);
}

export function clearNpmScriptLogs() {
   clearLastLine();
   clearLastLine();
   clearLastLine();
}
