import { create } from 'zustand';

interface UniversityState {
	university: string;
	setUniversity: (university: string) => void;
}

export const useCurUniversityStore = create<UniversityState>((set) => ({
	university: '',
	setUniversity: (university) => set({ university }),
}));
