import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
// if (!window.massa && import.meta.env.DEV) {
//   window.massa = {
//     getAccount: async () => 'AU1devfakeaddress...',
//     sendTransaction: async () => 'mock-tx-id',
//     readTransaction: async () => ({
//       returnValue: new TextEncoder().encode(JSON.stringify(['Mock Post','gdgddgd']))
//     }),
//   };
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)