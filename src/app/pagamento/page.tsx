"use client"
import React from 'react';
import { useQRCode } from 'next-qrcode';

function App() {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={'https://github.com/bunlong/next-qrcode'}
      options={{
        errorCorrectionLevel: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#0000',
          light: '#ffff',
        },
      }}
    />
  );
}

export default App;