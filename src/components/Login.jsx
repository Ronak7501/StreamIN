import React, { useState } from 'react';
import './login.css'; // Import your CSS file
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// const Login = ({ setLoginUser, navigate }) => {
const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const loginData = {
        email: email,
        password: password
      };
      axios.post("http://localhost:9002/login", loginData)
        .then(res => {
          alert(res.data.message);
          // console.log(res.data.message);
          setLoginUser(res.data.user);

          // Store the session ID or token in localStorage
          localStorage.setItem('sessionId', res.data.sessionId);
          
          navigate("/");
        })
        .catch(error => {
          console.error("Login failed:", error);
          alert("Login failed. Please try again.");
          // console.log("Login failed. Please try again.");
        });
        // .catch(error => {
        //   // console.error("Login failed:", error);
        //   alert("Login failed. Please try again.");
        //   return error; // Add this line to return the error
        // });
        
    } else {
      console.log("Invalid Input");
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
        data-testid="login-button"
        type="submit" className="bg-[#9147ff] hover:bg-[#7d33cc] text-white font-bold py-2 px-4 rounded-full">
          Login
        </button>
        <div>or</div>
        <div className="font-bold button" data-testid="register-button" onClick={handleRegisterClick}>Register</div>
      </form>
    </div>
  );
}

export default Login;
