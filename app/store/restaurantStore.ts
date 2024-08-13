import { create } from 'zustand';
import { CurSelectedPosState, UniversityState } from '../lib/types';

export const useCurUniversityStore = create<UniversityState>((set) => ({
	university: '',
	setUniversity: (university) => set({ university }),
}));

export const useCurSelectedPosStore = create<CurSelectedPosState>((set) => ({
	curSelectedPos: {
		lat: 0,
		lng: 0,
	},
	setCurSelectedPos: (curSelectedPos) => set({ curSelectedPos }),
}));
