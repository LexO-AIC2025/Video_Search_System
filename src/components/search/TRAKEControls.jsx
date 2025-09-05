import React from 'react';

const TRAKEControls = ({ topK, onTopKChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '24px', 
      borderRadius: '8px', 
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '500', 
            marginBottom: '8px' 
          }}>
            Số lượng kết quả (Top K)
          </label>
          <input
            type="number"
            min="1"
            max="200"
            value={topK || 5}
            onChange={(e) => onTopKChange(parseInt(e.target.value) || 5)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '10px 16px',
            backgroundColor: '#4338ca',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#3730a3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4338ca'}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default TRAKEControls;