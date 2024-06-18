import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import SignUp from './signup';
import { BrowserRouter as Router } from 'react-router-dom'; 

jest.mock('axios');

describe('SignUp component', () => {
  test('renders SignUp component', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const signUpTitle = screen.queryAllByText('Sign Up');
    expect(signUpTitle.length).toBeGreaterThan(0);
  });

  test('allows user input in username field', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const usernameInput = screen.getByPlaceholderText('Enter your username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
  });

  test('allows user input in email field', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const emailInput = screen.getByPlaceholderText('Enter your email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('allows user input in password field', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    expect(passwordInput.value).toBe('testpassword');
  });

  test('displays alert with invalid input', () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
    window.alert = jest.fn();

    fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));

    expect(window.alert).toHaveBeenCalledWith('Invalid Input');
  });
});
