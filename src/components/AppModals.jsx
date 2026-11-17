import React from 'react';
import { EvaluationModal } from './EvaluationModal';
import { ApiKeyModal } from './ApiKeyModal';
import { CustomLocationModal } from './CustomLocationModal';
import { SymptomTriageModal } from './SymptomTriageModal';

/**
 * AppModals container for all global overlays.
 * @param {{
 *   modals: any,
 *   apiKey: string,
 *   onSaveApiKey: (key: string) => void,
 *   onAddCity: (city: any) => void,
 *   city: any,
 *   profile: any
 * }} props
 */
export function AppModals({ modals, apiKey, onSaveApiKey, onAddCity, city, profile }) {
  return (
    <>
      <EvaluationModal
        isOpen={modals.evalModalOpen}
        onClose={() => modals.setEvalModalOpen(false)}
      />
      <ApiKeyModal
        isOpen={modals.apiKeyModalOpen}
        onClose={() => modals.setApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={onSaveApiKey}
      />
      <CustomLocationModal
        isOpen={modals.customLocationModalOpen}
        onClose={() => modals.setCustomLocationModalOpen(false)}
        onAddCity={onAddCity}
      />
      <SymptomTriageModal
        isOpen={modals.triageModalOpen}
        onClose={() => modals.setTriageModalOpen(false)}
        city={city}
        profile={profile}
      />
    </>
  );
}

export default AppModals;
