import React from 'react';
import { Filter } from 'lucide-react';

const Filters = ({ 
  filters, 
  onFilterChange, 
  isExpanded, 
  onToggle 
}) => {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

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
        <span>Filters</span>
        <Filter style={{ 
          width: '20px', 
          height: '20px', 
          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', 
          transition: 'transform 0.2s' 
        }} />
      </button>
      
      {isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '4px' 
            }}>
              Tags
            </label>
            <input
              type="text"
              placeholder="cooking, nature..."
              value={filters.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
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
          
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '4px' 
            }}>
              OCR Contains
            </label>
            <input
              type="text"
              placeholder="text in video..."
              value={filters.ocr_contains}
              onChange={(e) => handleChange('ocr_contains', e.target.value)}
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

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '4px' 
            }}>
              ASR Keywords
            </label>
            <input
              type="text"
              placeholder="spoken words in audio..."
              value={filters.asr_keywords}
              onChange={(e) => handleChange('asr_keywords', e.target.value)}
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
        </div>
      )}
    </div>
  );
};

export default Filters;