import { Routes, Route } from "react-router-dom";

import AuthProvider from "./components/security/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Stay from "./pages/Stay";
import SearchResults from "./pages/SearchResults";
import SignupLogin from "./pages/SignupLogin";

import Account from "./pages/account/Account";
import Trips from "./pages/account/Trips";
import Wishlist from "./pages/account/Wishlist";
import Messages from "./pages/account/Messages";

import Hosting from "./pages/hosting/Hosting";
import Properties from "./pages/hosting/Properties";
import PropertyEdit from "./pages/hosting/PropertyEdit";
import HostingCalendar from "./pages/hosting/HostingCalendar";

import NoMatch from "./pages/NoMatch";

import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Header showSearch={true}/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchresults" element={<SearchResults />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/signuplogin" element={<SignupLogin />} />

            {/* Guarded by authentication */}
            <Route path="/myaccount" element={<Account />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/messages" element={<Messages />} />

            <Route path="/hosting" element={<Hosting />} />
            <Route path="/hosting/properties" element={<Properties />} />
            <Route path="/hosting/property/add" element={<PropertyEdit editMode={false} />} />
            <Route path="/hosting/property/edit/:id" element={<PropertyEdit editMode={true} />} />
            <Route path="/hosting/calendar" element={<HostingCalendar />} />

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App