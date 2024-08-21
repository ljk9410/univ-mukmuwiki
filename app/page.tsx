import { getPostData } from './api/postAPI';
import MainView from './components/MainView';

export const revalidate = 10; // 10초마다 페이지를 갱신

export default async function Home() {
	const postDataList = await getPostData('post'); // TODO: try catch 걸기

	return (
		<main className="flex min-h-screen w-full h-screen flex-col items-center justify-between">
			<MainView postDataList={postDataList} />
		</main>
	);
}
