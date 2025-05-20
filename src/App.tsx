import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Form from './components/form';
import './index.css'
import { WalletProvider } from './contexts/walletContex';
import Footer from './components/footer';
import Post from './components/posts';

function App() {
  return (
    <BrowserRouter>

     <WalletProvider>
        <Header />
        <main>
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path='/post/:id' element={<Post/>} />
          </Routes>
        </main>
        <Footer/>
    </WalletProvider>
    
    </BrowserRouter>
   
  );
}

export default App;