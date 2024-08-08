import Image from 'next/image';
import KaKaoMap from './components/KaKaoMap';

export default function Home() {
	return (
		<main className="flex min-h-screen w-full h-screen flex-col items-center justify-between">
			<KaKaoMap />
		</main>
	);
}
