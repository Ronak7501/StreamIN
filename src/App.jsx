import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';


import Navbar from "./components/Navbar";
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/signup';
import Dashboard from './components/Dashboard';
import VideoCall from './components/Streaming';
import VideoCallPage from './components/liveStreamPage';


function App() {
  const [user, setLoginUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const handleLogout = () => {
    setLoginUser(null);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />}
        />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Streaming" element={<VideoCall />} />
        <Route path="/liveStreamPage" element={<VideoCallPage />} />
      </Routes>
    </Router>
  );
}

export default App;
