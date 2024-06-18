global.window.alert = jest.fn();

const setLoginUser = jest.fn();

const localStorageMock = {
    setItem: jest.fn(), 
  };
  

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Component', () => {



  test('successful login', async () => {
    const navigate = jest.fn(); 
    axios.post.mockResolvedValueOnce({ data: { message: 'Login successful', user: { id: 1 }, sessionId: 'abc123' } });
  
    render(
      <Router>
        <Login setLoginUser={setLoginUser} navigate={navigate} /> 
      </Router>
    );
  
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('login-button'));
  
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });
    
    jest.mock('axios');

    test('unsuccessful login', async () => {
      axios.post.mockRejectedValueOnce(new Error('Login failed'));
    
      const setLoginUser = jest.fn();
    
      render(
        <Router>
          <Login setLoginUser={setLoginUser} />
        </Router>
      );
    
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    
      fireEvent.click(screen.getByTestId('login-button'));
    
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Login failed. Please try again.");
      });      
    
      expect(setLoginUser).not.toHaveBeenCalled();
    });
  
    test('display register form on register button click', () => {
      const navigatejest = jest.fn();
      
      render(
        <Router>
          <Login navigate={navigatejest} />
        </Router>
      );
    
      fireEvent.click(screen.getByTestId('register-button'));
  
      setTimeout(() => {
        
        expect(navigatejest).toHaveBeenCalledWith('/signup');
      }, 1000); 
    });
  });
