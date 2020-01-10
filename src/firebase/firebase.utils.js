import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA7y9jV2WoJ5o3n6bc_HePhC987JjLg2JM",
  authDomain: "shop-page.firebaseapp.com",
  databaseURL: "https://shop-page.firebaseio.com",
  projectId: "shop-page",
  storageBucket: "shop-page.appspot.com",
  messagingSenderId: "944500412885",
  appId: "1:944500412885:web:ad240c5b35cc2df954ad5c",
  measurementId: "G-L8T4GRRDJ6"
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
