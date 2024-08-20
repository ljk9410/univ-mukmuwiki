import React from 'react';

type Props = {
	showModal: boolean;
	onClose: () => void;
};

const IntroductionModal = ({ showModal, onClose }: Props) => {
	if (!showModal) return null;

	const handleClickFeedbackBtn = () => {
		window.open('https://forms.gle/CF5UFLMnTXYvbzsU8');
		onClose();
	};

	return (
		<div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-75">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-[840px] w-full">
				<h2 className="text-[24px] font-semibold mb-6 text-center">
					🎉 먹무위키에 오신 것을 환영합니다 🎉
				</h2>
				<div
					style={{ wordBreak: 'keep-all' }}
					className="break-words whitespace-normal text-center leading-7"
				>
					<p>
						먹무위키는 '우리 대학 숨은 찐맛집은 우리 학교 사람들이 잘 알지
						않을까?' 라는 아이디어에서 시작했어요
					</p>
					<p>다른 맛집 리스트 서비스와 달리 누구나 참여할 수 있게 만들었어요</p>
					<p>우리 대학 사람들만 아는 맛집과 그 정보를 자유롭게 작성해봐요!</p>
					<p>
						현재 버전은 내부 테스트 버전으로 주변 사람들에게만 홍보한 버전이에요
					</p>
					<p>
						{
							'필요한 기능, 사용성, 오류 등 다양한 피드백은 저에게 큰 도움이 돼요! 많은 피드백 부탁드려요 :)'
						}
					</p>
					<p>{'추가적인 피드백을 하시려면 로고 버튼을 클릭해주세요'}</p>
				</div>
				<div className="flex m-auto justify-between mt-8 max-w-lg">
					<button
						onClick={onClose}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
					>
						닫기
					</button>
					<button
						onClick={handleClickFeedbackBtn}
						className="bg-[#0675F4] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
					>
						피드백 작성하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default IntroductionModal;
