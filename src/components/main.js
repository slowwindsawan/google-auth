import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import SuccessPage from "./success";
import { useEffect, useRef, useState } from "react";
import { IoLogoGoogle } from "react-icons/io";
import logo from "../assets/logo.png";

export default function Main() {
  const firebaseConfig = {
    apiKey: "AIzaSyCDBgRtDLY13s6dVvzcKouK5LYNy8Dqbr0",
    authDomain: "klyra-c84ad.firebaseapp.com",
    projectId: "klyra-c84ad",
    storageBucket: "klyra-c84ad.firebasestorage.app",
    messagingSenderId: "315865406417",
    appId: "1:315865406417:web:ee66e55bc07c042b9e1ef0",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [popupBlocked, setPopupBlocked] = useState(false);
  const loginBtnRef = useRef(null);

  const checkUserSignedIn = () => {
    const cookies = document.cookie.split(";").map((c) => c.trim());
    const firebaseUserCookie = cookies.find((c) => c.startsWith("firebaseUser="));
    if (!firebaseUserCookie) return null;

    try {
      const userData = JSON.parse(decodeURIComponent(firebaseUserCookie.split("=")[1]));
      return userData;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const currentUser = checkUserSignedIn();
    if (currentUser) {
      setUser(currentUser);
    } else {
      const testPopup = window.open("", "", "width=100,height=100");
      if (!testPopup || testPopup.closed || typeof testPopup.closed === "undefined") {
        setPopupBlocked(true);
        alert("Please allow popups for login");

        // Periodic check for popup permission
        const popupInterval = setInterval(() => {
          const recheckPopup = window.open("", "", "width=100,height=100");
          if (recheckPopup && !recheckPopup.closed) {
            recheckPopup.close();
            clearInterval(popupInterval);
            setPopupBlocked(false);
            loginBtnRef.current?.click();
          }
        }, 2000); // check every 2 seconds

        return () => clearInterval(popupInterval); // cleanup
      } else {
        testPopup.close();
        loginBtnRef.current?.click();
      }
    }
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      document.cookie = `firebaseUser=${encodeURIComponent(JSON.stringify(userData))}; path=/`;
      setUser(userData);
      console.log("User signed in:", userData);
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/popup-blocked") {
        setPopupBlocked(true);
        alert("Please allow popups for login");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = "firebaseUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setUser(null);
      console.log("User logged out");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {!user ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center opacity-0">
            <img style={{ height: "56px", width: "auto", margin: "auto" }} src={logo} />
            <h1 className="text-2xl font-semibold mb-2">Welcome to Klyra</h1>
            <p className="text-gray-600 mb-6">
              Sign in with your Google account to continue.
            </p>

            <button
              ref={loginBtnRef}
              onClick={handleLogin}
              className="bg-black text-white px-4 py-2 rounded flex items-center m-auto rounded-xl cursor-pointer hover:bg-blue-600"
            >
              <IoLogoGoogle className="mr-2" size={26} />
              &nbsp;Sign in with Google
            </button>
          </div>
        </div>
      ) : (
        <SuccessPage
          auth={auth}
          setUser={setUser}
          userData={user}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
}
