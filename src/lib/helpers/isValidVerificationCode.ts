export function isValidVerificationCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}
