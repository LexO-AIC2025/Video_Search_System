import React from 'react';
import { Settings } from 'lucide-react';

const AdvancedTuning = ({ 
  weights, 
  onWeightChange, 
  isExpanded, 
  onToggle 
}) => {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '24px', 
      borderRadius: '8px', 
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
    }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <span>Advanced Tuning</span>
        <Settings style={{ 
          width: '20px', 
          height: '20px', 
          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', 
          transition: 'transform 0.2s' 
        }} />
      </button>
      
      {isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.entries(weights).map(([type, value]) => (
            <div key={type}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '14px', 
                marginBottom: '8px' 
              }}>
                <label style={{ 
                  textTransform: 'capitalize', 
                  fontWeight: '500' 
                }}>
                  {type} Match
                </label>
                <span>{value}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onWeightChange(type, parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvancedTuning;