import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    currentUser: 'You',
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            const newMessage = {
                id: Date.now(),
                text: action.payload.text,
                user: state.currentUser,
                timestamp: new Date().toLocaleTimeString(),
            };
            state.messages.push(newMessage);
        },
        receiveMessage: (state, action) => {
            const newMessage = {
                id: Date.now() + Math.random(),
                text: action.payload.text,
                user: 'User2',
                timestamp: new Date().toLocaleTimeString(),
            };
            state.messages.push(newMessage);
        },
    },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
