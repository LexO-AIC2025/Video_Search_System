import React from 'react';

const Header = () => {
  return (
    <header style={{ 
      backgroundColor: 'white', 
      borderBottom: '1px solid #e5e7eb', 
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' 
    }}>
      <div style={{ 
        maxWidth: '1600px', 
        margin: '0 auto', 
        padding: '0 16px' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '64px' 
        }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#111827', 
            margin: 0 
          }}>
            Video Search System
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;