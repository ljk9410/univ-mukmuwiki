import { Transition } from '@headlessui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import SidebarButton from './SidebarButton';
import PostView from './PostView';
import PostForm from './PostForm';
import { Post } from '../lib/types';
import Image from 'next/image';
import { ListBulletIcon, MapIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

type Props = {
	isOpen: boolean;
	existingPost: Post | undefined;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, existingPost, setIsOpen }: Props) => {
	const [editMode, setEditMode] = useState(false);
	// nav 현재 버튼 표시
	const handleSidebarToggleBtn = () => {
		setIsOpen(!isOpen);
		setEditMode(false);
	};

	return (
		<div className="z-10 relative flex">
			<header
				className={`z-50 fixed w-16 left-0 top-0 h-full flex flex-col items-center bg-slate-50 ${
					!isOpen ? 'shadow-right' : 'border-r-[1px] border-t-slate-950'
				} border-r-[1px] border-gray-300`}
			>
				<h1>
					<button className="py-3 border-t-[1px] border-gray-300">
						<p>로고 박스</p>
					</button>
				</h1>
				<nav className="w-full">
					<ol>
						<li>
							<button className={styles.navButton}>
								<MapIcon className={styles.navButtonIcon} />
								<p className={styles.navButtonText}>지도</p>
							</button>
						</li>
						<li>
							<button className={styles.navButton}>
								<ListBulletIcon className={styles.navButtonIcon} />
								<p className={styles.navButtonText}>리스트</p>
							</button>
						</li>
					</ol>
				</nav>
				<footer>
					<button className="absolute w-full left-0 bottom-0 py-3 border-t-[1px] border-gray-300">
						<Image
							src={'/cau_logo.png'}
							width={100}
							height={100}
							alt="university logo"
						/>
					</button>
				</footer>
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

const styles = {
	navButton: classNames(
		'w-full h-[66px] flex flex-col justify-center items-center hover:bg-[#0675F4] group'
	),
	navButtonIcon: classNames(
		'w-[20px] text-[#3C3C3C] mb-[1px] group-hover:text-white'
	),
	navButtonText: classNames('text-[13px] group-hover:text-white'),
};

export default Sidebar;
