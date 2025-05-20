import React, { useState } from 'react';
import { Args } from '@massalabs/massa-web3';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

interface Props {
  index: number;
}

const LikeButton: React.FC<Props> = ({ index }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (liked || loading) return;
    try {
      setLoading(true);
      await window.massa.wallet().callSmartContract({
        targetAddress: CONTRACT_ADDRESS,
        functionName: "likePost",
        parameter: new Args().addU32(index).serialize(),
        maxGas: "1000000",
        fee: 0,
        coins: 0,
      });
      setLiked(true);
    } catch (err) {
      console.error("Like failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || loading}
      className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
    >
      {liked ? "Liked" : "Like"}
    </button>
  );
};

export default LikeButton;