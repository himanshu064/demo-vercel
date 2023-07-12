import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, query, where, addDoc, getDocs } from 'firebase/firestore';
import { DBUserSchema } from '@lantern/interfaces';
import firebase from '../config/firebase.app';

const provider = new GoogleAuthProvider();
const userCollection = collection(firebase.firestoreDB, 'users');

// helper methods
const saveUserData = async (data: Partial<DBUserSchema>) => {
  try {
    const emailQuery = query(userCollection, where('email', '==', data.email));
    // Execute the query to get the matching documents
    const querySnapshot = await getDocs(emailQuery);
    if (querySnapshot.empty) {
      await addDoc(userCollection, data);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

// exposed apis
const createUserWithCredentials = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  ageGeoRequirements: boolean,
  acceptPrivacyTerms: boolean
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      firebase.auth,
      email,
      password
    );
    // save new user in db
    await saveUserData({
      email: response.user.email!,
      displayName: `${firstName} ${lastName}`,
      ageGeoRequirements,
      acceptPrivacyTerms,
      provider: 'email',
      uid: response.user.uid,
      photoURL: response.user.photoURL,
    });
    return {
      user: response.user,
      providerId: response.providerId,
    };
  } catch (error: any) {
    console.log(error, 'error in registering user');
    throw new Error(error.message);
  }
};

const signInWithCredentials = async (email: string, password: string) => {
  const response = await signInWithEmailAndPassword(
    firebase.auth,
    email,
    password
  );
  return {
    user: response.user,
    providerId: response.providerId,
  };
};

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebase.auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const userEmail = result.user.email!;

    // save new user in db
    await saveUserData({
      email: userEmail,
      displayName: result.user.displayName!,
      ageGeoRequirements: true,
      acceptPrivacyTerms: true,
      provider: 'google.com',
      uid: result.user.uid,
      photoURL: result.user.photoURL,
    });
    const token = (credential?.accessToken || '') as string;
    const user = result.user;
    const providerId = result.providerId as string;
    return {
      token,
      user,
      providerId,
    };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

    throw new Error(
      JSON.stringify({
        errorCode,
        errorMessage,
        email,
        credential,
      })
    );
  }
};

const logout = async () => {
  try {
    await signOut(firebase.auth);
  } catch (error) {
    return error;
  }
};

const getCurrentUser = async (email: string) => {
  try {
    const emailQuery = query(userCollection, where('email', '==', email));
    // Execute the query to get the matching documents
    const querySnapshot = await getDocs(emailQuery);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

export {
  createUserWithCredentials,
  signInWithCredentials,
  signInWithGoogle,
  logout,
  getCurrentUser,
};
