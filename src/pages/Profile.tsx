import React from 'react';
import { useAuthStore } from '../store/authStore';

export default function Profile() {
  const { user, signOut } = useAuthStore();

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button
          onClick={signOut}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-gray-900 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-700"></div>
          <div>
            <h2 className="text-xl font-semibold">{user?.email}</h2>
            <p className="text-gray-400">Member since {user?.metadata.creationTime}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-gray-400">Followers</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-gray-400">Following</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold">0</div>
            <div className="text-gray-400">Tracks</div>
          </div>
        </div>
      </div>
    </div>
  );
}