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
