import { create } from 'zustand';
import { MediaState } from '../lib/types';

export const useMediaStore = create<MediaState>((set) => ({
	isMobile: false,
	setIsMobile: (isMobile) => set({ isMobile }),
}));
