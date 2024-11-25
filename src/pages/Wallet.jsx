import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your backend URL

function Wallet() {
  const [coinValue, setCoinValue] = useState(0);

  useEffect(() => {
    // Listen for coin updates
    socket.on('coinUpdate', (value) => {
      console.log('Coin value updated:', value);
      setCoinValue(value);
    });

    // Cleanup listener
    return () => socket.off('coinUpdate');
  }, []);

  return (
    <div>
      <h1>Wallet</h1>
      <p>Remaining Coins: {coinValue}</p>
    </div>
  );
}

export default Wallet;
