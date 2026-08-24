/**
 * Utilidades de RUT chileno: limpieza, formateo en vivo (XX.XXX.XXX-X)
 * y validación de dígito verificador (algoritmo Módulo 11).
 */

/** Quita puntos, guion y espacios; deja solo dígitos y la K/k (mayúscula). */
export function cleanRut(value: string): string {
  return value.replace(/[^0-9kK]/g, '').toUpperCase();
}

/** Calcula el dígito verificador de un cuerpo de RUT (sin verificador) vía Módulo 11. */
export function computeVerifierDigit(body: string): string {
  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = 11 - (sum % 11);
  if (remainder === 11) return '0';
  if (remainder === 10) return 'K';
  return String(remainder);
}

/**
 * Formatea progresivamente lo que el usuario va escribiendo como XX.XXX.XXX-X.
 * El último carácter ingresado se trata como el dígito verificador tentativo.
 */
export function formatRut(value: string): string {
  const clean = cleanRut(value);
  if (clean.length === 0) return '';
  if (clean.length === 1) return clean;

  const body = clean.slice(0, -1);
  const verifier = clean.slice(-1);

  const reversedGroups: string[] = [];
  for (let i = body.length; i > 0; i -= 3) {
    reversedGroups.unshift(body.slice(Math.max(0, i - 3), i));
  }

  return `${reversedGroups.join('.')}-${verifier}`;
}

/** Valida formato + dígito verificador de un RUT chileno (con o sin puntos/guion). */
export function isValidRut(value: string): boolean {
  const clean = cleanRut(value);
  if (clean.length < 2) return false;

  const body = clean.slice(0, -1);
  const verifier = clean.slice(-1);
  if (!/^\d+$/.test(body)) return false;

  return computeVerifierDigit(body) === verifier;
}
