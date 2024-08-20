'use client';

import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Sidebar from './Sidebar';
import { calculateDistance } from '../utiles';
import {
	useCurSelectedPosStore,
	useCurUniversityStore,
} from '../store/restaurantStore';
import { Post } from '../lib/types';
import IntroductionModal from './IntroductionModal';
import { useMediaStore } from '../store/mediaStore';

const CAUPos = { lat: 37.5043, lng: 126.9568 };

interface Props {
	postDataList: Post[];
}

const MainView = ({ postDataList }: Props) => {
	const { isMobile, setIsMobile } = useMediaStore();
	const { setUniversity } = useCurUniversityStore();
	const { curSelectedPos, setCurSelectedPos } = useCurSelectedPosStore();
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [existingPost, setExistingPost] = useState<Post>(); // TODO: Post Data 관리 방식 리펙토링
	const [showIntroductionModal, setShowIntroductionModal] = useState(false);

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

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 640px)');
		const handleResize = () => setIsMobile(mediaQuery.matches);

		setIsMobile(mediaQuery.matches);
		mediaQuery.addEventListener('change', handleResize);

		return () => mediaQuery.removeEventListener('change', handleResize);
	}, []);

	useEffect(() => {
		setUniversity('CAU'); // TODO: 학교별 나누기
	}, []);

	useEffect(() => {
		const firstOpenData = localStorage.getItem('firstOpen');

		if (!firstOpenData) {
			setShowIntroductionModal(true);
		}
	}, []);

	return (
		<>
			<Sidebar
				isOpen={isOpenSidebar}
				existingPost={existingPost}
				setIsOpen={setIsOpenSidebar}
				setShowIntroductionModal={setShowIntroductionModal}
			/>
			<IntroductionModal
				showModal={showIntroductionModal}
				onClose={() => {
					setShowIntroductionModal(false);
					localStorage.setItem('firstOpen', 'true');
				}}
			/>
			<Map
				center={CAUPos}
				style={{ width: '100%', height: '100%' }}
				level={3}
				minLevel={isMobile ? 6 : 5}
				onClick={handleClickMap}
			>
				{postDataList.map((post) => {
					if (post.latLng) {
						return (
							<MapMarker
								key={post.id}
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
					} else {
						return null;
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
				/>
			</Map>
		</>
	);
};

export default MainView;
