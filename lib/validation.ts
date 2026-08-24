const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validación de formato de correo electrónico simple (suficiente para un formulario de front-end). */
export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}
