import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; 
import NewComponent from './streamForm';

const mockAxios = new MockAdapter(axios);

describe('NewComponent', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('renders NewComponent correctly', () => {
    render(<NewComponent />);
    expect(screen.getByLabelText('Stream Name')).toBeInTheDocument();
    expect(screen.getByText('Create Live Stream')).toBeInTheDocument();
  });

  it('submits form and renders VideoCallPage on successful stream creation', async () => {
    const onCloseMock = jest.fn();
    render(<NewComponent onClose={onCloseMock} />);

    const streamNameInput = screen.getByLabelText('Stream Name');
    const createButton = screen.getByText('Create Live Stream');

    fireEvent.change(streamNameInput, { target: { value: 'TestStream' } });

    mockAxios.onPost('http://localhost:9002/streams').reply(200, {});

    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(1); 
    });

    expect(screen.queryByText('Create Live Stream')).not.toBeInTheDocument();
    expect(screen.getByTestId('video-call-page')).toBeInTheDocument(); 
    expect(screen.getByText('TestStream')).toBeInTheDocument();
  });
});
