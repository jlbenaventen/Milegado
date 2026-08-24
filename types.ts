import type { LucideIcon } from 'lucide-react-native';

/** Una de las 6 categorías de información que el usuario puede respaldar en su bóveda. */
export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  /**
   * Color hexadecimal del ícono (los íconos SVG de lucide-react-native leen la prop `color`,
   * no clases NativeWind, así que se define aquí en lugar de una className).
   */
  iconColorHex: string;
  /** Clase NativeWind para el fondo circular del chip del ícono (look "iconografía colorida"). */
  iconBgClassName: string;
}

/** Un documento (PDF o foto) subido durante el flujo de carga de la póliza de seguro de vida. */
export interface PolicyDocument {
  id: string;
  fileName: string;
  uri: string;
  mimeType: string | null;
  sizeBytes: number | null;
  uploadedAt: string; // ISO 8601
}

/** Datos de la póliza de seguro de vida asociados a los documentos subidos. */
export interface PolicyDetails {
  companyName: string;
  policyNumber: string;
  /** Monto asegurado en pesos chilenos (CLP), sin formatear. */
  insuredAmountCLP: number | null;
}

export const HEIR_RELATIONSHIPS = ['Esposa/o', 'Hijo/a', 'Abogado', 'Hermano/a', 'Amigo/a'] as const;

export type HeirRelationship = (typeof HEIR_RELATIONSHIPS)[number];

/** Un albacea digital (heredero) designado para recibir acceso a la bóveda. */
export interface HeirContact {
  id: string;
  fullName: string;
  /** RUT chileno formateado: XX.XXX.XXX-X */
  rut: string;
  email: string;
  relationship: HeirRelationship;
}

/** Estado completo del flujo de onboarding de la bóveda digital. */
export interface VaultState {
  selectedCategoryIds: string[];
  policyDocuments: PolicyDocument[];
  policyDetails: PolicyDetails;
  heirs: HeirContact[];
}
