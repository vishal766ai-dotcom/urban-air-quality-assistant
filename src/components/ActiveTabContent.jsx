import React from 'react';
import { SmogRadar } from './SmogRadar';
import { AeroAIChat } from './AeroAIChat';
import { RoutinesTab } from './RoutinesTab';
import { PurifierLab } from './PurifierLab';
import { ImpactCalculator } from './ImpactCalculator';
import { CommunityShield } from './CommunityShield';

/**
 * Renders the active tab view component.
 * @param {{
 *   activeTab: string,
 *   city: any,
 *   profile: any,
 *   apiKey?: string,
 *   onNavigateToTab: (t: string) => void
 * }} props
 */
export function ActiveTabContent({
  activeTab,
  city,
  profile,
  apiKey,
  onNavigateToTab
}) {
  return (
    <div className="animate-fade-in">
      {activeTab === 'dashboard' && <SmogRadar city={city} onNavigateToTab={onNavigateToTab} />}
      {activeTab === 'ai-assistant' && <AeroAIChat city={city} profile={profile} apiKey={apiKey} />}
      {activeTab === 'routines' && <RoutinesTab city={city} profile={profile} />}
      {activeTab === 'iaq-hacks' && <PurifierLab city={city} />}
      {activeTab === 'impact' && <ImpactCalculator city={city} profile={profile} />}
      {activeTab === 'community' && <CommunityShield city={city} profile={profile} />}
    </div>
  );
}

export default ActiveTabContent;
