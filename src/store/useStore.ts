import { create } from 'zustand';

interface StoreState {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  currentSection: number;
  setCurrentSection: (section: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  currentSection: 0,
  setCurrentSection: (section) => set({ currentSection: section }),
}));
