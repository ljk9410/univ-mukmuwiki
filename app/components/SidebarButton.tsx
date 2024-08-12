import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type Props = {
	isOpen: boolean;
	handleSidebarToggleBtn: () => void;
};

const SidebarButton = ({ isOpen, handleSidebarToggleBtn }: Props) => {
	return (
		<button
			className="-z-10 w-5 h-11 absolute -right-5 self-center flex items-center bg-white hover:bg-blue-100 rounded-r-lg border-t-[1px] border-r-[1px] border-b-[1px] border-[rgba(222,222,222)] border-opacity-50"
			onClick={handleSidebarToggleBtn}
		>
			<ChevronLeftIcon className="w-[16px]" />
		</button>
	);
};

export default SidebarButton;
