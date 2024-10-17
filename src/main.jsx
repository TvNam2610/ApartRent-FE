import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from '../src/components/GlobalStyles';
import { AuthContextProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthContextProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </AuthContextProvider>
    </StrictMode>,
);
