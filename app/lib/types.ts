export interface Post {
	id?: string;
	name: string;
	latLng?: {
		lat: number;
		lng: number;
	};
	address?: string;
	zipcode?: number | string;
	image: {
		coverImage?: string;
		images?: string[];
		thumbnail?: string;
	};
	content: string;
	university: string;
}

export interface MediaState {
	isMobile: boolean;
	setIsMobile: (isMobile: boolean) => void;
}

export interface UniversityState {
	university: string;
	setUniversity: (university: string) => void;
}

export interface CurSelectedPosState {
	curSelectedPos: {
		lat: number;
		lng: number;
	};
	setCurSelectedPos: (curSelectedPos: { lat: number; lng: number }) => void;
}
