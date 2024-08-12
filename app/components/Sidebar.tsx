import { Transition } from '@headlessui/react';
import {
	Bars3Icon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import SidebarButton from './SidebarButton';

type Props = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
	const handleSidebarToggleBtn = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="z-10 relative flex">
			<div className="z-50 fixed left-0 top-0 h-full flex items-center">
				<div className="w-16 h-full flex bg-slate-50 shadow-right">
					<p>로고박스</p>
				</div>
			</div>
			<Transition
				show={isOpen}
				enter="transition-transform duration-500"
				enterFrom="left-16 -translate-x-full"
				enterTo="left-0 translate-x-0"
				leave="transition-all duration-500"
				leaveFrom="left-0 translate-x-0"
				leaveTo="left-16 -translate-x-full"
			>
				<aside className="fixed z-10 left-16 top-0 h-full w-72 bg-slate-50 shadow-right flex">
					<p>사이드바</p>
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
