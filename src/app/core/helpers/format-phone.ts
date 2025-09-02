export function formatPhone(value: string): string {
    if (!value) return '';
  
    const cleaned = value.replace(/\D/g, '');
    let formattedValue = cleaned;
  
    if (cleaned.length > 2) {
      formattedValue = `(${cleaned.slice(0, 2)}) `;
  
      if (cleaned.length > 7) {
        formattedValue += `${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
      } else if (cleaned.length > 2) {
        formattedValue += cleaned.slice(2);
      }
    }
  
    return formattedValue;
  }
  