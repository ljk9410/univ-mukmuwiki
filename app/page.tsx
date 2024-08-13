import { getPostData } from './api/postAPI';
import MainView from './components/MainView';

export default async function Home() {
	const postDataList = await getPostData('post'); // TODO: try catch 걸기

	return (
		<main className="flex min-h-screen w-full h-screen flex-col items-center justify-between">
			<MainView postDataList={postDataList} />
		</main>
	);
}
