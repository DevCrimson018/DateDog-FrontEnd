export function formatBirthDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES');
}

export function getAge(birthDate: string): string {
  const today = new Date();
  const birth = new Date(birthDate);
  const years = today.getFullYear() - birth.getFullYear();
  const months = today.getMonth() - birth.getMonth();
  
  if (months < 0) {
    return `${years - 1} años`;
  }
  return `${years} años`;
}

export function getSexSymbol(sex: string): string {
  return sex === 'M' ? '♂' : '♀';
}
export function getSexLabel(sex: string): string {
  return sex === 'M' ? 'Masculino' : 'Femenino';
}
