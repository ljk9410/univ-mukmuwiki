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
import { Post } from '../lib/types';

const CAUPos = { lat: 37.5043, lng: 126.9568 };

interface Props {
	postDataList: Post[];
}

const MainView = ({ postDataList }: Props) => {
	const { setUniversity } = useCurUniversityStore();
	const { curSelectedPos, setCurSelectedPos } = useCurSelectedPosStore();
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [existingPost, setExistingPost] = useState<Post>();

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
			setExistingPost(undefined);
			setIsOpenSidebar(true);
		}
	};

	const handleClickMarker = (_: kakao.maps.Marker, post?: Post) => {
		if (!post) {
			setCurSelectedPos({
				lat: 0,
				lng: 0,
			});
			setIsOpenSidebar(false);
		} else {
			setExistingPost(post);
			setIsOpenSidebar(true);
		}
	};

	return (
		<>
			<Script
				src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
				strategy="beforeInteractive"
			/>
			<Sidebar
				isOpen={isOpenSidebar}
				existingPost={existingPost}
				setIsOpen={setIsOpenSidebar}
			/>
			<Map
				center={CAUPos}
				style={{ width: '100%', height: '100%' }}
				level={3}
				minLevel={5}
				onClick={handleClickMap}
			>
				{postDataList.map((post) => {
					if (post.latLng) {
						return (
							<MapMarker
								position={post.latLng}
								image={{
									src: '/puang_yum.png',
									size: {
										width: 54,
										height: 40,
									},
									options: {
										offset: {
											x: 27,
											y: 20,
										},
									},
								}}
								onClick={(_) => handleClickMarker(_, post)}
							/>
						);
					}
				})}
				{curSelectedPos && (
					<MapMarker
						position={curSelectedPos}
						image={{
							src: '/puang_search.png',
							size: {
								width: 80,
								height: 60,
							},
							options: {
								offset: {
									x: 40,
									y: 40,
								},
							},
						}}
						onClick={handleClickMarker}
					/>
				)}
				<MapMarker
					position={CAUPos}
					image={{
						src: '/puang.png',
						size: {
							width: 60,
							height: 80,
						},
					}}
					onClick={handleClickMarker}
				/>
			</Map>
		</>
	);
};

export default MainView;
