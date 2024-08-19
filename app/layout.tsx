import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '먹무위키 | 우리 대학 맛집 리스트는 내가 만든다!',
	description:
		'우리 대학 근처 맛집 리스트를 우리 대학 학생들이 만들어가는 사이트',
	manifest: '/manifest.json',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<Script
					src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`}
					strategy="beforeInteractive"
				/>
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
