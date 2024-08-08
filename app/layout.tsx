import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
			<body className={inter.className}>{children}</body>
		</html>
	);
}
