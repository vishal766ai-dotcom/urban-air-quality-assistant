import { useState, useCallback } from 'react';

/**
 * Custom hook managing modal visibility and accessibility preferences.
 */
export function useAppModals() {
  const [evalModalOpen, setEvalModalOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [customLocationModalOpen, setCustomLocationModalOpen] = useState(false);
  const [triageModalOpen, setTriageModalOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeFont, setLargeFont] = useState(false);

  const toggleHighContrast = useCallback(() => setHighContrast(prev => !prev), []);
  const toggleLargeFont = useCallback(() => setLargeFont(prev => !prev), []);

  return {
    evalModalOpen,
    setEvalModalOpen,
    apiKeyModalOpen,
    setApiKeyModalOpen,
    customLocationModalOpen,
    setCustomLocationModalOpen,
    triageModalOpen,
    setTriageModalOpen,
    highContrast,
    toggleHighContrast,
    largeFont,
    toggleLargeFont
  };
}

export default useAppModals;
