'use client';

import Script from 'next/script';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Sidebar from './Sidebar';
import { calculateDistance } from '../utiles';
import { useCurUniversityStore } from '../store/restaurantStore';

const CAUPos = { lat: 37.504647, lng: 126.957073 };

const MainView = () => {
	const [clickPos, setClickPos] = useState<{
		lat: number;
		lng: number;
	}>();
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const { university, setUniversity } = useCurUniversityStore();
	console.log('1111111:', university);

	const handleClickMap = (_: any, mouseEvent: kakao.maps.event.MouseEvent) => {
		if (!mouseEvent.latLng) return;

		const lat = mouseEvent.latLng.getLat();
		const lng = mouseEvent.latLng.getLng();

		if (
			calculateDistance(CAUPos, {
				lat,
				lng,
			}) > 1
		) {
			alert('너무 멀어요 ㅠㅠ');
		} else {
			setClickPos({
				lat,
				lng,
			});
			setIsOpenSidebar(true);
			setUniversity('CAU');
		}
	};
	const handleClickMarker = () => {
		setIsOpenSidebar(true);
	};

	return (
		<>
			<Script
				src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
				strategy="beforeInteractive"
			/>
			<Sidebar isOpen={isOpenSidebar} setIsOpen={setIsOpenSidebar} />
			<Map
				center={CAUPos}
				style={{ width: '100%', height: '100%' }}
				level={3}
				minLevel={4}
				onClick={handleClickMap}
			>
				<MapMarker position={CAUPos} onClick={handleClickMarker} />
				{clickPos && (
					<MapMarker
						position={clickPos}
						image={{
							src: '/icon-192x192.png', // 커스텀 마커
							size: {
								width: 32,
								height: 32,
							},
						}}
						onClick={handleClickMarker}
					/>
				)}
			</Map>
		</>
	);
};

export default MainView;
