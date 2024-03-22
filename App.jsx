import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';


// import Main from "./components/Main";
import Navbar from "./src/components/Navbar";
// import Sidebar from "./components/Sidebar";
import Login from './src/components/Login';
import Home from './src/components/Home';
import SignUp from './src/components/signup';
import Dashboard from './src/components/Dashboard';
import VideoCall from './src/components/Streaming';
import VideoCallPage from './src/components/liveStreamPage';

function App() {
  return (    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        <Route path="/Streaming" component={<VideoCall />} />
        <Route path="/liveStreamPage" component={<VideoCallPage />} />
      </Routes>
    </Router>
  );
}

export default App;


