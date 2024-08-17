import React from 'react';

type Props = {
	showModal: boolean;
	onClose: () => void;
	onConfirm: () => void;
};

const PostModal = ({ showModal, onClose, onConfirm }: Props) => {
	if (!showModal) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
				<h3 className="text-[24px] font-semibold mb-4 text-center">
					작성을 완료할까요?
				</h3>
				<p
					style={{ wordBreak: 'keep-all' }}
					className="break-words whitespace-normal mb-6 text-center"
				>
					먹무위키는 모두가 쉽게 참여할 수 있는 열린 지식의 공간이자, 함께
					가꾸어 나가는 소중한 터전이에요. 비속어, 음란물 등 부적절한 콘텐츠가
					포함되지 않도록 한 번 더 점검해 주세요! 우리 함께 건강하고 유익한
					정보를 함께 만들어 가요😀
				</p>
				<p></p>
				<div className="flex justify-between">
					<button
						onClick={onClose}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
					>
						취소
					</button>
					<button
						onClick={onConfirm}
						className="bg-[#0675F4] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
					>
						제출하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostModal;
