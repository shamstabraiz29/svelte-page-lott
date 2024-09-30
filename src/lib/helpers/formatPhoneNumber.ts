export function formatPhoneNumber(input: string): string {
  const digits = input.replace(/\D/g, "");

  return digits.replace(/(\d{3})(\d{1,4})?(\d{1,4})?/, (match, p1, p2, p3) => {
    let formattedNumber = "";

    if (p1) formattedNumber += p1;
    if (p2) formattedNumber += `-${p2}`;
    if (p3) formattedNumber += `-${p3}`;      

    return formattedNumber;
  });
}
