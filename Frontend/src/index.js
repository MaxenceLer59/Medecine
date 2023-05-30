import React from 'react';
import ReactDOM from 'react-dom/client';
import Identification from './pages/Identification';
import { UserProvider } from '../../config/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UserProvider><Identification /></UserProvider>);
