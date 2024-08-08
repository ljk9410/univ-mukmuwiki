import { Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
	const handleSidebarToggleBtn = () => {
		setIsOpen(!isOpen);
	};

	return (
		<Transition
			show={isOpen}
			enter="transition-transform duration-500"
			enterFrom="-translate-x-full"
			enterTo="translate-x-0"
			leave="transition-transform duration-500"
			leaveFrom="translate-x-0"
			leaveTo="-translate-x-full"
		>
			<aside className="z-10 fixed left-0 top-0 h-full flex">
				<div className="w-64 bg-slate-50 shadow-right">
					<p>사이드바</p>
				</div>
				<button
					className="-z-10 w-5 h-11 self-center flex items-center bg-white hover:bg-blue-100 rounded-r-lg border-t-[1px] border-r-[1px] border-b-[1px] border-[rgba(222,222,222)] border-opacity-50"
					onClick={handleSidebarToggleBtn}
				>
					{isOpen ? (
						<ChevronLeftIcon className="w-[16px]" />
					) : (
						<ChevronRightIcon className="w-[16px]" />
					)}
				</button>
			</aside>
		</Transition>
	);
};

export default Sidebar;
