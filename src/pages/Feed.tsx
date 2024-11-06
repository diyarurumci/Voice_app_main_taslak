import React, { useState } from 'react';

export default function Feed() {
  const [activeTab, setActiveTab] = useState<'featured' | 'following'>('featured');

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Feed</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'featured'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'following'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            Following
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Placeholder content - replace with real data */}
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-gray-400">Feed content will be implemented here...</p>
        </div>
      </div>
    </div>
  );
}