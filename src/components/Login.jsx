import React, { useState } from 'react';
import './login.css'; // Import your CSS file
import axios from "axios"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault()
    if({email} && {password}){
      const loginData = {
        email : email,
        password : password
      }
      axios.post("http://localhost:9002/login", loginData)
      .then(res => alert(res.data.message))
    }else{
      console.log("Invalid Input");
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Email</label>
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
        <button type="submit">Login</button>
        <div>or</div>
        <div className="button">Register</div>
      </form>
    </div>
  );
}

export default Login;
