import React from 'react';
import testImage from '../assets/image/1.png'; // adjust the path as needed

const ImageTest = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Testing Image Import in React</h2>
      <img
        src={testImage}
        alt="Test"
        style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
      />
      <p>If you see the image above, it's working ✅</p>
    </div>
  );
};

export default ImageTest;
