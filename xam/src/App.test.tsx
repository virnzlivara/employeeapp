import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
 

test('renders the app landing page', () => {
  const { container } = render(<Provider store={store}>
           <App />
        </Provider>);
 
  expect(container.getElementsByClassName('App').length).toBe(1); 
});
 
