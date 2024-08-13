import { db } from '@/firebaseConfig';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
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
				lat: docData.latLng.lat,
				lng: docData.latLng.lng,
			},
			address: docData.address,
			zipcode: docData.zipcode,
			content: docData.content,
			image: {
				coverImage: docData.coverImage,
				images: docData.images,
				thumbnail: docData.thumbnail,
			},
			university: docData.university,
		};
	});

	return data;
};

export const updatePostData = async (
	id: string,
	updatedData: Partial<Post>
) => {
	const postRef = doc(db, 'post', id);

	await updateDoc(postRef, updatedData);
};
