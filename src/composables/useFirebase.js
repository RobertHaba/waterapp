import { getDoc } from 'firebase/firestore';
export async function useGetDataFromDB(docRef) {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
}
