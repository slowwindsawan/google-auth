import React, { useState } from "react";
import { signOut } from "firebase/auth";

export default function SuccessPage({ setUser, auth, userData }) {
  // Inside Main component
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase auth

      // Clear the cookie by setting an expired date
      document.cookie =
        "firebaseUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Update state to null so UI shows login button again
      setUser(null);

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-5 font-sans">
      <div className="bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] p-12 max-w-md w-full relative overflow-hidden border-t-[6px] border-indigo-500 backdrop-blur">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

        <div className="w-[90px] h-[90px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_8px_25px_rgba(102,126,234,0.3)] animate-pulse">
          <span className="text-white text-3xl font-bold">✓</span>
        </div>

        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-500 mb-4 tracking-tight text-center">
          Successfully Connected!
        </h1>

        <p className="text-lg text-gray-600 mb-10 text-center">
          You can now close this tab and start using the extension.
        </p>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 mb-8 text-left border border-indigo-100 shadow-sm">
          <div className="flex items-center mb-4 gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow">
              <span role="img" aria-label="user" className="text-xs">
                👤
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">Name</div>
              <div className="text-base text-gray-800 font-medium">
                {userData.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow">
              <span
                role="img"
                aria-label="email"
                className="text-white text-xs"
              >
                ✉
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">Email</div>
              <div className="text-base text-gray-800 font-medium">
                {userData.email}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-gradient-to-br from-green-100 to-green-200 text-green-800 px-7 py-3 rounded-xl font-semibold text-base inline-flex items-center gap-2 border border-green-300 shadow-sm">
            <span className="text-green-600 text-sm animate-pulse">●</span>
            Extension is ready to use
          </div>
          <button
            className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 w-fit mt-2"
            onClick={handleLogout}
          >
            Signout
          </button>
        </div>
      </div>
    </div>
  );
}
