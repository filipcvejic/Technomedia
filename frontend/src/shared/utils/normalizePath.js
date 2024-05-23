export function normalizePath(filePath) {
  const parts = filePath.split(/[/\\]/);

  return parts[2];
}
