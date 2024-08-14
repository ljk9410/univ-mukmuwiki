import { Transition } from '@headlessui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import SidebarButton from './SidebarButton';
import PostView from './PostView';
import PostForm from './PostForm';
import { Post } from '../lib/types';

type Props = {
	isOpen: boolean;
	existingPost: Post | undefined;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, existingPost, setIsOpen }: Props) => {
	const [editMode, setEditMode] = useState(false);

	const handleSidebarToggleBtn = () => {
		setIsOpen(!isOpen);
		setEditMode(false);
	};

	return (
		<div className="z-10 relative flex">
			<header
				className={`z-50 fixed w-16 left-0 top-0 h-full flex bg-slate-50 ${
					!isOpen ? 'shadow-right' : 'border-r-[1px] border-t-slate-950'
				}`}
			>
				<p>로고박스</p>
			</header>
			<Transition
				show={isOpen}
				enter="transition-transform duration-500"
				enterFrom="left-16 -translate-x-full"
				enterTo="left-0 translate-x-0"
				leave="transition-all duration-500"
				leaveFrom="left-0 translate-x-0"
				leaveTo="left-16 -translate-x-full"
			>
				<aside className="fixed z-10 left-16 top-0 h-full w-[384px] bg-slate-50 shadow-right flex">
					{editMode ? (
						<PostForm />
					) : existingPost ? (
						<PostView post={existingPost} setEditMode={setEditMode} />
					) : (
						<PostForm />
					)}
					<SidebarButton
						isOpen={isOpen}
						handleSidebarToggleBtn={handleSidebarToggleBtn}
					/>
				</aside>
			</Transition>
		</div>
	);
};

export default Sidebar;
