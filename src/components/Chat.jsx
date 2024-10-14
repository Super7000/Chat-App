import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from '../features/chatSlice';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const [messageText, setMessageText] = useState('');
    const chatEndRef = useRef(null);

    const handleSendMessage = () => {
        if (messageText.trim()) {
            dispatch(sendMessage({ text: messageText }));
            setMessageText('');
            simulateMessageReception();
        }
    };

    const simulateMessageReception = () => {
        setTimeout(() => {
            dispatch(receiveMessage({ text: 'Hello! This is a simulated response.' }));
        }, 1500);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Box sx={{ padding: 2, height: '85vh', display: 'flex', flexDirection: 'column', bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1 }}>
            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <ListItem key={msg.id} sx={{ paddingX: 0, paddingTop: index > 0 ? (messages[index - 1].user === msg.user ? 0 : 1) : 1 }}>
                        <Box sx={{
                            color: 'white',
                            borderRadius: 1,
                            bgcolor: msg.user === 'You' ? 'primary.main' : 'secondary.main',
                            width: 'fit-content',
                            ml: msg.user === 'You' ? 'auto' : 0,
                            maxWidth: '75%',
                        }}>
                            <ListItemText
                                sx={{ paddingLeft: 1, paddingRight: 1, lineHeight: 1 }}
                                primary={<Typography variant="body1" sx={{ lineHeight: 1 }} >{msg.text}</Typography>}
                                secondary={<Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>{`${msg.user} - ${msg.timestamp}`}</Typography>}
                            />
                        </Box>
                    </ListItem>
                ))}
                {messages.length === 0 && (
                    <ListItem>
                        <ListItemText
                            primary="No messages yet"
                            sx={{ textAlign: 'center', color: 'gray' }}
                        />
                    </ListItem>
                )}
                <div ref={chatEndRef} />
            </List>


            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    sx={{
                        bgcolor: '#fff',
                    }}
                />
                <Button variant="contained" onClick={handleSendMessage} sx={{ marginLeft: 2, minHeight: '0' }}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
