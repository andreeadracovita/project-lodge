import { Routes, Route } from "react-router-dom";

import AuthProvider from "./components/security/AuthContext";
import RequireAuth from "./components/security/RequireAuth";
import Header from "./components/common/header/Header";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Stay from "./pages/Stay";
import SearchResults from "./pages/SearchResults";
import SignupLogin from "./pages/SignupLogin";

import Account from "./pages/account/Account";
import Settings from "./pages/account/Settings";
import Trips from "./pages/account/Trips";
import Wishlist from "./pages/account/Wishlist";
import Messages from "./pages/account/Messages";

import Hosting from "./pages/hosting/Hosting";
import Properties from "./pages/hosting/Properties";
import PropertyEdit from "./pages/hosting/PropertyEdit";
import HostingCalendar from "./pages/hosting/HostingCalendar";
import HostingMessages from "./pages/hosting/HostingMessages";

import NoMatch from "./pages/NoMatch";

import "./App.css";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchresults" element={<SearchResults />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/signuplogin" element={<SignupLogin />} />

            {/* Guarded by authentication */}
            <Route path="/myaccount" element={<RequireAuth><Account /></RequireAuth>} />
            <Route path="/myaccount/settings" element={<RequireAuth><Settings /></RequireAuth>} />
            <Route path="/trips" element={<RequireAuth><Trips /></RequireAuth>} />
            <Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
            <Route path="/messages" element={<RequireAuth><Messages /></RequireAuth>} />

            <Route path="/hosting" element={<RequireAuth><Hosting /></RequireAuth>} />
            <Route path="/hosting/properties" element={<RequireAuth><Properties /></RequireAuth>} />
            <Route path="/hosting/property/add" element={<RequireAuth><PropertyEdit editMode={false} /></RequireAuth>} />
            <Route path="/hosting/property/edit/:id" element={<RequireAuth><PropertyEdit editMode={true} /></RequireAuth>} />
            <Route path="/hosting/calendar" element={<RequireAuth><HostingCalendar /></RequireAuth>} />
            <Route path="/hosting/messages" element={<RequireAuth><HostingMessages /></RequireAuth>} />

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </>
  )
}
