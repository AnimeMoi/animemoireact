import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
export const GoogleProvider = new GoogleAuthProvider();
export const XProvider = new TwitterAuthProvider();
export const GithubProvider = new GithubAuthProvider();

export const CheckAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(null);
      }
    });
  }, []);

  return isLoggedIn;
};
