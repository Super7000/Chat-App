import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Chat from './components/Chat';
import { Container, Typography } from '@mui/material';

const App = () => {
    return (
        <Provider store={store}>
            <Container maxWidth="sm" sx={{ marginTop: 1 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Chat Application
                </Typography>
                <Chat />
            </Container>
        </Provider>
    );
};

export default App;
