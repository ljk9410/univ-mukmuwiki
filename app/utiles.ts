export const calculateDistance = (
	pos1: { lat: number; lng: number },
	pos2: { lat: number; lng: number }
) => {
	const R = 6371; // 지구의 반경 (단위: km)
	const dLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
	const dLng = (pos2.lng - pos1.lng) * (Math.PI / 180);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(pos1.lat * (Math.PI / 180)) *
			Math.cos(pos2.lat * (Math.PI / 180)) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // 단위: km

	return distance;
};
