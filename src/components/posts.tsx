import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Args } from '@massalabs/massa-web3';
import LikeButton from './like';
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const Post: React.FC = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [post, setPost] = useState<any>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) fetchPost(id);
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      setStatus('Loading post...');
      if (!window.massa) throw new Error('Wallet extension not found');

      const args = new Args().addU32(BigInt(parseInt(postId))).serialize();

      const result = await window.massa.readTransaction({
        targetAddress: CONTRACT_ADDRESS,
        functionName: 'getPost',
        parameter: args,
      });

      const decoded = new TextDecoder().decode(result.returnValue);
      const parsed = JSON.parse(decoded);
      setPost(parsed);
      setStatus('');
    } catch (err) {
      console.error(err);
      setStatus('Error loading post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {status && (
          <div className="text-center text-lg text-yellow-400 mb-6">{status}</div>
        )}

        {post && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">
            {post.image && (
              <img
                src={`https://ipfs.io/ipfs/${post.image}`}
                alt="Post"
                className="w-full h-64 object-cover rounded"
              />
            )}
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="text-sm text-gray-400">
              By <code className="text-red-400">{post.author}</code> · {post.timestamp}
            </div>
            <p className="text-lg leading-relaxed whitespace-pre-line">{post.content}</p>
            <LikeButton index={parseInt(id!)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;