import { ChangeEvent, FormEvent, useState } from 'react';
import { Post } from '../lib/types';
import { addPostData, updatePostData } from '../api/postAPI';
import {
	useCurSelectedPosStore,
	useCurUniversityStore,
} from '../store/restaurantStore';
import { CameraIcon } from '@heroicons/react/24/outline';

const PostForm = () => {
	// TODO: 처음 눌렀을 때 해당 데이터는 없어요! 추가해주시겠어요? 라는 단계 추가하기, 편집모드로 구분하기

	const { university } = useCurUniversityStore();
	const { curSelectedPos } = useCurSelectedPosStore();
	const [postData, setPostData] = useState<Post>({
		name: '',
		image: {},
		content: '',
		university: '',
	});

	const handleChangeText = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPostData({
			...postData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			if (postData?.id || postData?.latLng) {
				await updatePostData('qzgJTQXywuJM5qiiKjTP', postData);
			} else {
				await addPostData({
					...postData,
					latLng: curSelectedPos,
					university: university,
				});
			}
		} catch (error) {
			// TODO: 에러 추적 기능 넣기
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full h-full flex flex-col overflow-scroll"
		>
			<button className="w-full h-[180px] flex flex-col justify-center items-center border-b-[1px] border-gray-300">
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
					placeholder="주소를 알려주세요"
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
				<button
					type="submit"
					className="w-full bg-[#0675F4] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					제출하기
				</button>
			</div>
		</form>
	);
};

export default PostForm;
