import React, { createContext, useContext, useState, ReactNode } from 'react';

type ViewMode = 'work' | 'demo';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isWorkMode: boolean;
  isDemoMode: boolean;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('work');

  return (
    <ViewModeContext.Provider
      value={{
        viewMode,
        setViewMode,
        isWorkMode: viewMode === 'work',
        isDemoMode: viewMode === 'demo',
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
