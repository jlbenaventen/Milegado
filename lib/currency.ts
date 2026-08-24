/** Utilidades de formateo de montos en pesos chilenos (CLP). */

/** Deja solo dígitos y los convierte a número (0 si está vacío). */
export function parseCLPInput(text: string): number {
  const digits = text.replace(/[^0-9]/g, '');
  return digits ? Number(digits) : 0;
}

/** Formatea un número como texto de input con separador de miles chileno, sin símbolo de moneda: "1.250.000". */
export function formatCLPInput(value: number): string {
  if (!value) return '';
  return new Intl.NumberFormat('es-CL').format(value);
}

/** Formatea un número como moneda completa para mostrar: "$1.250.000". */
export function formatCLP(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
}
