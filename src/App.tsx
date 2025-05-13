import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stay from './pages/Stay';
import User from './pages/User';
import Trips from './pages/Trips';
import Wishlist from './pages/Wishlist';
import AccountSettings from './pages/AccountSettings';
import NoMatch from './pages/NoMatch';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stay/:id" element={<Stay />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App