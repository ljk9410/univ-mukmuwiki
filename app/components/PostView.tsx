import { CameraIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Post } from '../lib/types';
import { MapPinIcon } from '@heroicons/react/24/solid';

type Props = {
	post: Post;
	setEditMode: (mode: boolean) => void;
};

const PostView = ({ post, setEditMode }: Props) => {
	return (
		<div className="w-full h-full flex flex-col overflow-scroll">
			<div className="w-full h-[180px] flex flex-col justify-center items-center border-b-[1px] border-gray-300">
				<CameraIcon className="w-[32px] mb-2" />
				<p className="text-[14px]">대표 사진이 없어요</p>
			</div>
			<div className="relative w-full p-4">
				<h2 className="text-[20px] mb-2">{post.name}</h2>
				<div className="flex items-center">
					<MapPinIcon className="w-[18px] text-gray-400 mr-1" />
					<p className="text-[14px]">{post.address}</p>
				</div>
				<p className="pt-12">{post.content}</p>
				<button
					className="absolute right-2 top-3 w-8 h-8 flex justify-center items-center group"
					onClick={() => setEditMode(true)}
				>
					<PencilSquareIcon className="w-[20px] group-hover:scale-110" />
				</button>
			</div>
		</div>
	);
};

export default PostView;
