import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './context/authContext.jsx';
// import { SocketContextProvider } from './context/SocketContext.jsx';
// import GlobalStyles from '../src/components/GlobalStyles';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthContextProvider>
            {/* <SocketContextProvider> */}
            {/* <GlobalStyles> */}
            <App />
            {/* </GlobalStyles> */}
            {/* </SocketContextProvider> */}
        </AuthContextProvider>
    </StrictMode>,
);
