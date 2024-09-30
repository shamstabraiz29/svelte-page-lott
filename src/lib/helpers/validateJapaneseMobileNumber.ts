export function validateJapaneseMobileNumber(number: string): boolean {
  const regex = /^(090|080|070)\d{8}$/;
  return regex.test(number);
}
