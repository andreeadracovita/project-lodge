import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stay from './pages/Stay';
import User from './pages/User';
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
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
