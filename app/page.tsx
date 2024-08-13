import { getPostData } from './api/postAPI';
import MainView from './components/MainView';

export default async function Home() {
	const postData = await getPostData('post');

	return (
		<main className="flex min-h-screen w-full h-screen flex-col items-center justify-between">
			<MainView />
		</main>
	);
}
