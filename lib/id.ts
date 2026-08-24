/** Genera un id local simple (suficiente para claves de lista en memoria; no es un UUID criptográfico). */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
