import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';


import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from './components/login';
import Home from './components/Home';
import SignUp from './components/signup';
import Dashboard from './components/dashboard';


function App() {
  return (    
    <Router>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<SignUp />}/>

          <Route path="/Dashboard" element={<Dashboard />}/>
        
        </Routes>
    </Router>
  );
}

export default App;


