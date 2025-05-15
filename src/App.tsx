import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Stay from './pages/Stay';

import SignupLogin from './pages/SignupLogin';
import Account from './pages/Account';
import Trips from './pages/Trips';
import Wishlist from './pages/Wishlist';
import Messages from './pages/Messages';

import Hosting from './pages/Hosting';
import Listings from './pages/Listings';
import ListingEdit from './pages/ListingEdit';
import Calendar from './pages/Calendar';

import NoMatch from './pages/NoMatch';

import './App.css';

function App() {
  return (
    <>
      <Header showSearch={true}/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stay/:id" element={<Stay />} />

          <Route path="/signup-login" element={<SignupLogin />} />
          <Route path="/myaccount" element={<Account />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/messages" element={<Messages />} />

          <Route path="/hosting" element={<Hosting />} />
          <Route path="/hosting/listings" element={<Listings />} />
          <Route path="/hosting/listing/add" element={<ListingEdit editMode={false} />} />
          <Route path="/hosting/listing/edit/:id" element={<ListingEdit editMode={true} />} />
          <Route path="/hosting/calendar" element={<Calendar />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App