export function convertToInternationalFormat(localNumber: string): string {
  return localNumber.replace(/^0/, "+81").replace(/-/g, "");
}
