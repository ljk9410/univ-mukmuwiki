import { ChangeEvent, useEffect, useState } from 'react';
import { Post } from '../lib/types';
import { addPostData, updatePostData } from '../api/postAPI';
import {
	useCurSelectedPosStore,
	useCurUniversityStore,
} from '../store/restaurantStore';
import { CameraIcon } from '@heroicons/react/24/outline';
import PostModal from './PostModal';

type Props = {
	editMode: boolean;
	existingPost?: Post;
	setEditMode: (mode: boolean) => void;
};

const PostForm = ({ editMode, existingPost, setEditMode }: Props) => {
	const { university } = useCurUniversityStore();
	const { curSelectedPos } = useCurSelectedPosStore();
	const [postData, setPostData] = useState<Post>({
		name: '',
		image: {},
		content: '',
		university: '',
	});
	const [showModal, setShowModal] = useState(false);

	const handleChangeText = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPostData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async () => {
		try {
			if (postData?.id) {
				await updatePostData(postData.id, postData);
			} else {
				await addPostData({
					...postData,
					latLng: curSelectedPos,
					university: university,
				});
			}
			window.location.reload();
		} catch (error) {
			console.log('error', error);
			// TODO: 에러 추적 기능 넣기
		}
	};

	useEffect(() => {
		if (existingPost) {
			setPostData(existingPost);
		}
	}, []);

	useEffect(() => {
		const loadKakaoMaps = () => {
			if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
				const geocoder = new window.kakao.maps.services.Geocoder();
				new window.kakao.maps.LatLng(curSelectedPos.lat, curSelectedPos.lng);

				const callback = function (result: any, status: any) {
					if (status === window.kakao.maps.services.Status.OK) {
						if (result[0]?.road_address?.address_name) {
							setPostData({
								...postData,
								address: result[0].road_address.address_name,
							});
						} else {
							setPostData({
								...postData,
								address: result[0].address.address_name,
							});
						}
					}
				};

				geocoder.coord2Address(
					curSelectedPos.lng,
					curSelectedPos.lat,
					callback
				);
			} else {
				console.error('Kakao Maps SDK not loaded');
			}
		};

		if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
			loadKakaoMaps();
		} else {
			const script = document.createElement('script');
			script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
			script.async = true;
			script.defer = true;
			script.onload = loadKakaoMaps;
			document.head.appendChild(script);
		}
	}, [curSelectedPos]);

	if (!existingPost && !editMode) {
		return (
			<div className="w-full flex flex-col justify-center items-center px-3 mb-[140px] sm:mb-0">
				<h3 className="text-[18px] font-bold">
					아직 해당 맛집의 정보가 없어요😋
				</h3>
				<div className="flex flex-col items-center text-[14px] mt-4 mb-8">
					<p>우리 대학 주변의 맛집을 가장 잘 아는 당신!</p>
					<p>내가 자주 가는 우리 대학 주변 맛집이 있다면?</p>
					<p>&apos;우리 대학 먹무위키&apos;에 남겨서 사람들과 공유해봐요!</p>
				</div>
				<button
					onClick={() => setEditMode(true)}
					className="w-full bg-[#0675F4] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					맛집 공유하러 가기
				</button>
			</div>
		);
	}

	return (
		<>
			<PostModal
				showModal={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={handleSubmit}
			/>
			<form
				className="w-full h-full flex flex-col overflow-scroll"
				onSubmit={handleSubmit}
			>
				<button
					type="button"
					className="w-full h-[180px] flex flex-col justify-center items-center border-b-[1px] border-gray-300"
					onClick={() => alert('현재 준비 중인 기능입니다🙂')}
				>
					<CameraIcon className="w-[32px] mb-2" />
					<p className="text-[14px]">대표 사진을 추가해주세요</p>
				</button>
				<div className="w-full p-4">
					<label
						htmlFor="name"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						가게 이름
					</label>
					<input
						type="text"
						name="name"
						id="name"
						value={postData.name}
						onChange={handleChangeText}
						className="w-full px-3 py-2 mb-7 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						placeholder="가게 이름을 입력해주세요"
					/>

					<label
						htmlFor="address"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						주소
					</label>
					<input
						type="text"
						name="address"
						id="address"
						value={postData.address}
						onChange={handleChangeText}
						className="w-full px-3 py-2 mb-7 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						placeholder="주소를 입력해주세요"
					/>

					<label
						htmlFor="content"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						정보
					</label>
					<textarea
						name="content"
						id="content"
						value={postData.content}
						onChange={handleChangeText}
						rows={8}
						className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
						placeholder="알고 있는 정보를 자유롭게 입력해주세요"
					/>
					{!postData.name || !postData.content ? (
						<div className="w-full flex justify-center items-center bg-gray-400 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							입력 칸을 모두 채워주세요
							<span className="translate-y-[0.5px] translate-x-1">🙂</span>
						</div>
					) : (
						<button
							type="button"
							onClick={() => setShowModal(true)}
							className="w-full bg-[#0675F4] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							{existingPost ? '수정하기' : '공유하기'}
						</button>
					)}
				</div>
			</form>
		</>
	);
};

export default PostForm;
