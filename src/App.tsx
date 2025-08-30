import { Routes, Route } from "react-router-dom";

import AuthProvider from "components/security/AuthContext";
import RequireAuth from "components/security/RequireAuth";
import Header from "components/common/header/Header";
import Footer from "components/common/Footer";

import Home from "pages/Home";
// import Stay from "pages/Stay";
// import Book from "pages/Book";
// import Booking from "pages/Booking";
// import SearchResults from "pages/SearchResults";
import SignupLogin from "pages/SignupLogin";

import Account from "pages/account/Account";
import Settings from "pages/account/Settings";
// import Trips from "pages/account/Trips";
// import Wishlist from "pages/account/Wishlist";
// import Review from "pages/account/Review";
// import UserReviews from "pages/account/UserReviews";

// import HostingDashboard from "pages/hosting/HostingDashboard";
// import Properties from "pages/hosting/Properties";
// import PropertyEdit from "pages/hosting/PropertyEdit";
// import HostingCalendar from "pages/hosting/HostingCalendar";

import NoMatch from "pages/NoMatch";

import "./App.css";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/search-results" element={<SearchResults />} />*/}
            {/*<Route path="/stay" element={<Stay />} />*/}
            {/*<Route path="/book" element={<Book />} />*/}
            {/*<Route path="/booking" element={<Booking />} />*/}
            <Route path="/signup-login" element={<SignupLogin />} />

            {/* Guarded by authentication */}
            <Route path="/myaccount" element={<RequireAuth><Account /></RequireAuth>} />
            <Route path="/myaccount/settings" element={<RequireAuth><Settings /></RequireAuth>} />
            {/*<Route path="/trips" element={<RequireAuth><Trips /></RequireAuth>} />*/}
            {/*<Route path="/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />*/}
            {/*<Route path="/myaccount/reviews" element={<RequireAuth><UserReviews /></RequireAuth>} />*/}
            {/*<Route path="/review" element={<RequireAuth><Review /></RequireAuth>} />*/}

            {/*<Route path="/hosting" element={<RequireAuth><HostingDashboard /></RequireAuth>} />*/}
            {/*<Route path="/hosting/properties" element={<RequireAuth><Properties /></RequireAuth>} />*/}
            {/*<Route path="/hosting/property/add" element={<RequireAuth><PropertyEdit /></RequireAuth>} />*/}
            {/*<Route path="/hosting/property/edit" element={<RequireAuth><PropertyEdit /></RequireAuth>} />*/}
            {/*<Route path="/hosting/calendar" element={<RequireAuth><HostingCalendar /></RequireAuth>} />*/}

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </>
  )
}
