import { Post } from '../lib/types';

type Props = {
	post: Post;
	setEditMode: (mode: boolean) => void;
};

const PostView = ({ post, setEditMode }: Props) => {
	return (
		<div className="w-full h-full bg-red-100 flex flex-col overflow-scroll">
			<button className="w-full h-[200px] bg-slate-400"></button>
			<div className="w-full">
				<p>{post.name}</p>
				<p>{post.address}</p>
				<p>{post.content}</p>
			</div>
			<button onClick={() => setEditMode(true)}>편집하기</button>
		</div>
	);
};

export default PostView;
