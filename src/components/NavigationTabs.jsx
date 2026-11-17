import React from 'react';

/**
 * NavigationTabs component for switching between dashboard views.
 * @param {{
 *   tabs: Array<{ id: string, label: string, icon: any, badge?: string }>,
 *   activeTab: string,
 *   onSelectTab: (tabId: string) => void
 * }} props
 */
export function NavigationTabs({ tabs, activeTab, onSelectTab }) {
  return (
    <div className="flex items-center gap-1 sm:gap-2 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
              isActive
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-700/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span className="whitespace-nowrap">{tab.label}</span>
            {tab.badge && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                isActive ? 'bg-white text-emerald-800' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default NavigationTabs;
