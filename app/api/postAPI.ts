import { db } from '@/firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Post } from '../lib/types';

export const addPostData = async (postData: Post) => {
	await addDoc(collection(db, 'post'), postData);
};

export const getPostData = async (collectionName: string) => {
	const docSnap = await getDocs(collection(db, collectionName));
	const data: Post[] = docSnap.docs.map((doc) => {
		const docData = doc.data();
		return {
			id: doc.id,
			name: docData.name,
			latLng: {
				lat: docData.lat,
				lng: docData.lng,
			},
			address: docData.address,
			zipcode: docData.zipcode,
			content: docData.content,
			image: {
				coverImage: docData.coverImage,
				images: docData.images,
				thumbnail: docData.thumbnail,
			},
		};
	});

	return data;
};
