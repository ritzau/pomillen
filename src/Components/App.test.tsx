import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import { render } from '@testing-library/react';
import App from './App';

test('renders header', () => {
    const { getByText } = render(
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>);

    const headerElement = getByText(/pomillen/i);
    expect(headerElement).toBeInTheDocument();
});
