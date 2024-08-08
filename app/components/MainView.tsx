'use client';

import Script from 'next/script';
import { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Sidebar from './Sidebar';

const CAUPos = { lat: 37.504647, lng: 126.957073 };
const CAUPos2 = { lat: 37.5, lng: 126.95 };

const MainView = () => {
	const [clickPos, setClickPos] = useState<{
		lat: number;
		lng: number;
	}>();
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	const handleClickMap = (_: any, mouseEvent: kakao.maps.event.MouseEvent) => {
		if (mouseEvent.latLng) {
			setClickPos({
				lat: mouseEvent.latLng.getLat(),
				lng: mouseEvent.latLng.getLng(),
			});
		}
	};
	const handleClickMarker = () => {
		setIsOpenSidebar(!isOpenSidebar);
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
