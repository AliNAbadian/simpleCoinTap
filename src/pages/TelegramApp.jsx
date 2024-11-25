import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axiosInstance from '../libs/axiosInstance'; 

const TelegramApp = () => {
    const [coinValue, setCoinValue] = useState(0);
    const [userPoints, setUserPoints] = useState(0);
    const socket = io('http://localhost:3000'); // Replace with your backend WebSocket URL

    useEffect(() => {
        // Fetch initial data
        const fetchInitialData = async () => {
            const userId = '1'; // Get user ID from Telegram WebApp
            const [coinRes, userRes] = await Promise.all([
                axiosInstance.get('/coin'),
                axiosInstance.get(`/user/${userId}`),
            ]);
            setCoinValue(coinRes.data.remaining);
            setUserPoints(userRes.data.wallet);
        };
        fetchInitialData();

        // Listen for coin updates
        socket.on('coinUpdate', (newValue) => {
            setCoinValue(newValue);
        });

        return () => socket.disconnect(); // Cleanup on unmount
    }, [socket]);

    const handleTap = async () => {
        try {
            const userId = '1'; // Replace with the actual user ID
            const response = await axiosInstance.post('/coin/tap', { userId });
            setCoinValue(response.data.remainingCoin);
            console.log(response.data)
            setUserPoints(response.data.userPoints);
        } catch (error) {
            console.error('Error tapping the coin:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Coin Value: {coinValue}</h1>
            <button
                onClick={handleTap}
                style={{
                    fontSize: '24px',
                    padding: '20px',
                    borderRadius: '50%',
                    background: 'gold',
                    border: 'none',
                    cursor: 'pointer',
                    margin: 0,
                }}
            >
                💰 Tap Me!
            </button>
            <h2>Your Points: {userPoints}</h2>
        </div>
    );
};

export default TelegramApp;
