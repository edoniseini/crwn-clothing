import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCstrbVc5E6RVDQJW45GR4rDA7C7Fu70AM",
  authDomain: "shopping-95b47.firebaseapp.com",
  databaseURL: "https://shopping-95b47.firebaseio.com",
  projectId: "shopping-95b47",
  storageBucket: "shopping-95b47.appspot.com",
  messagingSenderId: "103227641637",
  appId: "1:103227641637:web:66165b848469c6906e54cc",
  measurementId: "G-NT8XN9L893"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
