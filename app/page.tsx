import Image from 'next/image';
import MainView from './components/MainView';

export default function Home() {
	return (
		<main className="flex min-h-screen w-full h-screen flex-col items-center justify-between">
			<MainView />
		</main>
	);
}
