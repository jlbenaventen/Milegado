import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import type { PropsWithChildren } from 'react';

import type { HeirContact, PolicyDetails, PolicyDocument, VaultState } from '@/types';

type VaultAction =
  | { type: 'TOGGLE_CATEGORY'; categoryId: string }
  | { type: 'ADD_DOCUMENT'; document: PolicyDocument }
  | { type: 'REMOVE_DOCUMENT'; documentId: string }
  | { type: 'SET_POLICY_DETAILS'; details: Partial<PolicyDetails> }
  | { type: 'ADD_HEIR'; heir: HeirContact }
  | { type: 'REMOVE_HEIR'; heirId: string };

const initialState: VaultState = {
  selectedCategoryIds: [],
  policyDocuments: [],
  policyDetails: { companyName: '', policyNumber: '', insuredAmountCLP: null },
  heirs: [],
};

function vaultReducer(state: VaultState, action: VaultAction): VaultState {
  switch (action.type) {
    case 'TOGGLE_CATEGORY': {
      const isSelected = state.selectedCategoryIds.includes(action.categoryId);
      return {
        ...state,
        selectedCategoryIds: isSelected
          ? state.selectedCategoryIds.filter((id) => id !== action.categoryId)
          : [...state.selectedCategoryIds, action.categoryId],
      };
    }
    case 'ADD_DOCUMENT':
      return { ...state, policyDocuments: [...state.policyDocuments, action.document] };
    case 'REMOVE_DOCUMENT':
      return {
        ...state,
        policyDocuments: state.policyDocuments.filter((doc) => doc.id !== action.documentId),
      };
    case 'SET_POLICY_DETAILS':
      return { ...state, policyDetails: { ...state.policyDetails, ...action.details } };
    case 'ADD_HEIR':
      return { ...state, heirs: [...state.heirs, action.heir] };
    case 'REMOVE_HEIR':
      return { ...state, heirs: state.heirs.filter((heir) => heir.id !== action.heirId) };
    default:
      return state;
  }
}

interface VaultContextValue {
  state: VaultState;
  toggleCategory: (categoryId: string) => void;
  addDocument: (document: PolicyDocument) => void;
  removeDocument: (documentId: string) => void;
  setPolicyDetails: (details: Partial<PolicyDetails>) => void;
  addHeir: (heir: HeirContact) => void;
  removeHeir: (heirId: string) => void;
}

const VaultContext = createContext<VaultContextValue | null>(null);

export function VaultProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(vaultReducer, initialState);

  const toggleCategory = useCallback(
    (categoryId: string) => dispatch({ type: 'TOGGLE_CATEGORY', categoryId }),
    [],
  );
  const addDocument = useCallback(
    (document: PolicyDocument) => dispatch({ type: 'ADD_DOCUMENT', document }),
    [],
  );
  const removeDocument = useCallback(
    (documentId: string) => dispatch({ type: 'REMOVE_DOCUMENT', documentId }),
    [],
  );
  const setPolicyDetails = useCallback(
    (details: Partial<PolicyDetails>) => dispatch({ type: 'SET_POLICY_DETAILS', details }),
    [],
  );
  const addHeir = useCallback((heir: HeirContact) => dispatch({ type: 'ADD_HEIR', heir }), []);
  const removeHeir = useCallback(
    (heirId: string) => dispatch({ type: 'REMOVE_HEIR', heirId }),
    [],
  );

  const value = useMemo(
    () => ({
      state,
      toggleCategory,
      addDocument,
      removeDocument,
      setPolicyDetails,
      addHeir,
      removeHeir,
    }),
    [state, toggleCategory, addDocument, removeDocument, setPolicyDetails, addHeir, removeHeir],
  );

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>;
}

export function useVault(): VaultContextValue {
  const context = useContext(VaultContext);
  if (!context) {
    throw new Error('useVault debe usarse dentro de un <VaultProvider>');
  }
  return context;
}
