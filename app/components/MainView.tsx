'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Sidebar from './Sidebar';
import { calculateDistance } from '../utiles';
import {
	useCurSelectedPosStore,
	useCurUniversityStore,
} from '../store/restaurantStore';

const CAUPos = { lat: 37.504647, lng: 126.957073 };

const MainView = () => {
	const { setUniversity } = useCurUniversityStore();
	const { curSelectedPos, setCurSelectedPos } = useCurSelectedPosStore();
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	useEffect(() => {
		setUniversity('CAU'); // TODO: 학교별 나누기
	}, []);

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
			setCurSelectedPos({
				lat,
				lng,
			});
			setIsOpenSidebar(true);
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
				{curSelectedPos && (
					<MapMarker
						position={curSelectedPos}
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
