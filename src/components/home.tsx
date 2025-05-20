// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Args } from '@massalabs/massa-web3';
import { useNavigate } from 'react-router-dom';
import LikeButton from './like';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const Home: React.FC = () => {
  const [titles, setTitles] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostTitles();
  }, []);

  const fetchPostTitles = async () => {
    try {
      setStatus('Loading posts...');
      if (!window.massa) throw new Error('Wallet extension not found');

      const result = await window.massa.readTransaction({
        targetAddress: CONTRACT_ADDRESS,
        functionName: 'getAllTitles',
        parameter: new Args().serialize(),
      });

      const decoded = new TextDecoder().decode(result.returnValue);
      const parsed = JSON.parse(decoded);
      setTitles(parsed);
      setStatus('');
    } catch (err) {
      console.error(err);
      setStatus('Error loading posts');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Latest Posts
            </span>
          </h2>
          <button
            onClick={() => navigate('/form')}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-red-900/20 flex items-center space-x-2"
          >
            <span>Create Post</span>
          </button>
        </div>

        {status && (
          <div className="text-center py-8">
            <p className={`text-lg ${status.includes('Error') ? 'text-red-400' : 'text-yellow-400'}`}>
              {status}
            </p>
            {!status.includes('Error') && (
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {titles.map((title, index) => {
            const [main, image] = title.split('::');
            const imageUrl = image ? `https://ipfs.io/ipfs/${image}` : null;

            return (
              <div
                key={index}
                className="group relative bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-red-700/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {imageUrl && (
                  <img src={imageUrl} alt="Post" className="w-full h-48 object-cover rounded mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-4 truncate">{main}</h3>
                
<button
  type="button"
  onClick={() => {
    console.log("Navigating to post:", index);
    navigate(`/post/${index}`);
  }}
  className="mt-4 bg-red-700/30 hover:bg-red-700/40 text-red-400 px-4 py-2 rounded-md transition-all duration-200 border border-red-800/50 hover:border-red-800/70 text-sm font-medium flex items-center space-x-2"
>
  <span>Read More</span>
</button>
                <LikeButton index={index} />
              </div>
              
            );
          })}
        </div>

        {titles.length === 0 && !status && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No posts available. Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

