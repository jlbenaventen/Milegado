# Mi Legado — Bóveda Digital

MVP del flujo de onboarding de **Mi Legado**, una bóveda digital patrimonial y de
emergencia localizada para Chile. Permite a una persona organizar su información
sensible (pólizas, cuentas, claves, testamento, mensajes) y designar albaceas
digitales de confianza para que puedan acceder a ella.

Este repositorio contiene las **4 pantallas del flujo de registro/onboarding**,
construidas como app React Native con Expo.

## Stack

- [Expo](https://docs.expo.dev/versions/v57.0.0/) SDK 57 (React Native 0.86, React 19)
- [Expo Router](https://docs.expo.dev/router/introduction/) — navegación basada en archivos
- [NativeWind v4](https://www.nativewind.dev/) — Tailwind CSS para React Native
- TypeScript estricto
- [lucide-react-native](https://lucide.dev/) — set de íconos
- `expo-document-picker` — carga real de PDF/fotos

## Cómo correrlo

```bash
npm install
npm start
```

Luego abre el proyecto en Expo Go (escaneando el QR) o en un emulador iOS/Android
desde el menú de Expo CLI. Este proyecto no incluye soporte web todavía (requeriría
instalar `react-dom` y `react-native-web` aparte).

## Flujo implementado

| # | Ruta | Pantalla |
|---|------|----------|
| 1 | `/onboarding` | Bienvenida — presenta el valor de la bóveda y los 3 pasos del onboarding |
| 2 | `/onboarding/categories` | Categoriza tu información — grilla de 6 categorías a respaldar |
| 3 | `/onboarding/upload-policy` | Sube tu póliza de seguro de vida (PDF o foto) + datos de la póliza |
| 4 | `/onboarding/executors` | Designa tus albaceas digitales (heredero + RUT + relación) |

El estado del flujo (categorías elegidas, documentos subidos, albaceas agregados)
vive en memoria durante la sesión, vía un `VaultProvider` (Context + `useReducer`)
montado en `app/_layout.tsx` — ver `context/VaultContext.tsx`.

## Estructura

```
app/
  _layout.tsx              Layout raíz: VaultProvider + Stack de Expo Router
  index.tsx                 Redirect a /onboarding
  onboarding/
    index.tsx                Pantalla 1: Bienvenida
    categories.tsx            Pantalla 2: Categorías
    upload-policy.tsx         Pantalla 3: Subir póliza
    executors.tsx              Pantalla 4: Albaceas digitales
components/                 Componentes reutilizables (VaultHeader, ProgressBar,
                             RutInput, BottomNav, Button, CategoryCard, FileCard,
                             HeirCard, RelationshipPicker, LabeledTextInput, ...)
context/VaultContext.tsx    Estado global del onboarding
lib/
  rut.ts                     Formateo y validación de RUT chileno (dígito
                              verificador, Módulo 11)
  currency.ts                 Formateo de montos en CLP
  constants.ts                 Categorías, pasos de bienvenida
  validation.ts                 Validación de correo
  id.ts                          Generador de ids locales
types.ts                    Tipos de dominio: Category, PolicyDocument,
                             HeirContact, VaultState
```

## Decisiones de alcance (MVP)

- La Pantalla 3 está fija al flujo de "Seguros de Vida"; las categorías elegidas
  en la Pantalla 2 quedan guardadas en el estado pero no generan formularios
  adicionales todavía.
- Sin persistencia en disco: el progreso se pierde al cerrar la app. Sería el
  siguiente paso natural (`AsyncStorage` o backend real).
- Sin backend: los documentos subidos y los datos de los albaceas no se envían
  a ningún servidor, solo viven en el estado de la app.
- El selector de "Relación" del heredero usa chips en vez de un picker nativo,
  para no sumar una dependencia extra en el MVP.
