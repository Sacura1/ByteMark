import React, { useState, useContext, useEffect } from 'react';
import WalletContext from '../contexts/walletContex';
import { Args } from '@massalabs/massa-web3';
import { useNavigate } from 'react-router-dom';
import { CKEditor ,} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const Form: React.FC = () => {
  const { address } = useContext(WalletContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!address) {
      setStatus('Connect your wallet to create a post');
    }
  }, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.massa || !address) {
      setStatus('Connect wallet first.');
      return;
    }

    try {
      setStatus('Submitting post...');

      const args = new Args()
        .addString(title)
        .addString(content);

      const txId = await window.massa.sendTransaction({
        targetAddress: CONTRACT_ADDRESS,
        functionName: 'addPost',
        parameter: args.serialize(),
        maxGas: 100000n,
        coins: 0n,
        fee: 10_000_000n,
      });

      setStatus(`Post submitted. Transaction ID: ${txId}`);
      setTitle('');
      setContent('');
      navigate('/');
    } catch (error) {
      console.error('Error submitting post:', error);
      setStatus(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Create a Post
            </span>
          </h2>
          {!address && (
            <p className="text-red-400 text-sm">Connect your wallet to post</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none 
                       focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Content
            </label>
            <div className='ck-editor-dark' style={{
          '--ck-bg': '#1f2937',
          '--ck-color': '#f3f4f6',
          '--ck-border': '#374151',
          '--ck-toolbar-bg': '#111827'
        } as React.CSSProperties}>

              
              <CKEditor
                editor={ClassicEditor}
                data={content}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(_: any, editor: { getData: () => React.SetStateAction<string>; }) => setContent(editor.getData())}
                config={{
                  toolbar: [
                    'heading', '|',
                    'bold', 'italic', 'link', '|',
                    'bulletedList', 'numberedList', '|',
                    'blockQuote', 'undo', 'redo'
                  ]
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!address}
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 
                     text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {status.includes('Submitting') ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span>Publish Post</span>
              </>
            )}
          </button>
        </form>

        {status && (
          <div className={`mt-6 p-4 rounded-lg ${status.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
            <p className="text-sm">{status}</p>
          </div>
        )}
      </div>
    </div>


    </div>
  );
};

export default Form;