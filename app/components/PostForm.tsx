import { ChangeEvent, FormEvent, useState } from 'react';
import { Post } from '../lib/types';
import { addPostData } from '../api/postAPI';

const PostForm = () => {
	const [postData, setPostData] = useState<Post>({
		name: '',
		image: {},
		content: '',
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
			await addPostData(postData);
		} catch (error) {}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full h-full bg-red-100 flex flex-col overflow-scroll"
		>
			<div className="w-full h-[200px]">
				<p>이미지</p>
			</div>

			<div className="w-full">
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
					className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
					placeholder="가게 이름을 입력하세요"
				/>
			</div>

			<div className="w-full">
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
					className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
					placeholder="주소를 알려주세요"
				/>
			</div>

			<div className="w-full">
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
					className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
					placeholder="다양한 정보를 자유롭게 입력해주세요"
				/>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				제출하기
			</button>
		</form>
	);
};

export default PostForm;
