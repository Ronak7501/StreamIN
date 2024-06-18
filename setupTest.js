import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';

// Mock global objects
global.alert = jest.fn();
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

// Mock API module
jest.mock('./api');
