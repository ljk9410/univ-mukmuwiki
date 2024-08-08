import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

const KaKaoMap = () => {
	return (
		<>
			<Script
				src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
				strategy="beforeInteractive"
			/>
			<Map
				center={{ lat: 33.450701, lng: 126.570667 }}
				style={{ width: '100%', height: '100%' }}
				level={3}
			>
				{/* <MapMarker position={{ lat: 33.450701, lng: 126.570667 }}>
					<div style={{ color: '#000' }}>Hello World!</div>
				</MapMarker> */}
			</Map>
		</>
	);
};

export default KaKaoMap;
