import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import Main from "./components/Main";
import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/signup';
import Dashboard from './components/Dashboard';
import VideoCall from './components/Streaming';
import VideoCallPage from './components/liveStreamPage';
import { useState } from 'react';

function App() {

  const [user, setLoginUser] = useState({});

  const handleLogout = () => {
    setLoginUser(null);
     // Clear user state upon logout
    // Additional logout logic (e.g., redirect to login page)
  };

  return (    
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
      <Route exact path="/" element={user && user._id ? <Home setLoginUser = {setLoginUser} /> : <Login setLoginUser={setLoginUser}/>} />
        <Route path="/login" element={<Login setLoginUser = {setLoginUser}/>} />
       
        <Route path="/signup" element={<SignUp />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Streaming" element={<VideoCall />} />
        <Route path="/liveStreamPage" element={<VideoCallPage />} />
      </Routes>
    </Router>
  );
}

export default App;


