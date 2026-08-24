import {
  Building2,
  CreditCard,
  Folder,
  Heart,
  Laptop,
  ScrollText,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';

import type { Category } from '@/types';

/** Las 6 categorías de información respaldable, mostradas en la grilla de la Pantalla 2. */
export const CATEGORIES: Category[] = [
  {
    id: 'seguros-afp',
    label: 'Seguros y AFP',
    icon: Folder,
    iconColorHex: '#2563EB', // blue-600
    iconBgClassName: 'bg-blue-50',
  },
  {
    id: 'bienes-raices',
    label: 'Bienes Raíces',
    icon: Building2,
    iconColorHex: '#D97706', // amber-600
    iconBgClassName: 'bg-amber-50',
  },
  {
    id: 'cuentas-bancarias',
    label: 'Cuentas Bancarias',
    icon: CreditCard,
    iconColorHex: '#059669', // emerald-600
    iconBgClassName: 'bg-emerald-50',
  },
  {
    id: 'claves-digitales',
    label: 'Claves Digitales',
    icon: Laptop,
    iconColorHex: '#7C3AED', // violet-600
    iconBgClassName: 'bg-violet-50',
  },
  {
    id: 'testamento-legal',
    label: 'Testamento & Legal',
    icon: ScrollText,
    iconColorHex: '#E11D48', // rose-600
    iconBgClassName: 'bg-rose-50',
  },
  {
    id: 'mensajes-personales',
    label: 'Mensajes Personales',
    icon: Heart,
    iconColorHex: '#DB2777', // pink-600
    iconBgClassName: 'bg-pink-50',
  },
];

/** ID de la categoría que impulsa el flujo de carga de la Pantalla 3 en este MVP. */
export const LIFE_INSURANCE_CATEGORY_ID = 'seguros-afp';

export interface OnboardingStep {
  icon: LucideIcon;
  label: string;
}

/** Los 3 pasos simples mostrados en la Pantalla 1 de bienvenida. */
export const WELCOME_STEPS: OnboardingStep[] = [
  { icon: Upload, label: 'Sube documentos' },
  { icon: Users, label: 'Designa herederos' },
  { icon: ShieldCheck, label: 'Activa verificación' },
];
