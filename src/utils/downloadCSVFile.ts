export function downloadCSVFile(blob: Blob, fileName: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `last_answers_${fileName}.csv`;
  link.click();

  window.URL.revokeObjectURL(url);
}
