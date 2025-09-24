import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Trains from './components/Trains';
import Tickets from './components/Tickets';
import BookTicket from './components/BookTicket';
import Footer from './components/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Admin from './Pages/Admin';
import './App.css';
import Logout from './Pages/Logout';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Navbar />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/signup" element={<Signup onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/" element={isLoggedIn ? <LandingPage /> : <Navigate to="/login" />} />
            <Route path="/trains" element={isLoggedIn ? <Trains /> : <Navigate to="/login" />} />
            <Route path="/tickets" element={isLoggedIn ? <Tickets /> : <Navigate to="/login" />} />
            <Route path="/book-ticket" element={isLoggedIn ? <BookTicket /> : <Navigate to="/login" />} />
            <Route path="/logout" element={<Logout onLogout={() => setIsLoggedIn(false)} />} />
            <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;

