import React from 'react';
import { Search, Clock } from 'lucide-react';
import { formatTime } from '../../utils/timeUtils';

const KeyframeCard = ({ 
  keyframe, 
  isInModal = false, 
  onSelect, 
  onHover, 
  onLeave 
}) => {
  const handleIconClick = (e) => {
    e.stopPropagation();
    if (!isInModal && onSelect) {
      onSelect(keyframe);
    }
  };

  const handleMouseEnter = () => {
    if (!isInModal && onHover) {
      onHover(keyframe);
    }
  };

  const handleMouseLeave = () => {
    if (!isInModal && onLeave) {
      onLeave();
    }
  };

  return (
    <div 
      className={`group ${
        isInModal ? '' : 'hover:shadow-2xl hover:scale-[1.02]'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Image Section */}
      <div className="relative" style={{ 
        backgroundColor: '#f3f4f6',
        overflow: 'hidden'
      }}>
        <img 
          src={keyframe.thumbnail_url} 
          alt={`Keyframe ${keyframe.keyframe_info}`}
          className="group-hover:scale-110"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        
        {/* Time Badge */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(8px)'
        }}>
          <Clock style={{ width: '12px', height: '12px' }} />
          {formatTime(keyframe.start_time_s)}
        </div>

        {/* Search Icon Overlay */}
        {!isInModal && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div 
              className="opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '50%',
                padding: '16px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
              }}
              onClick={handleIconClick}
            >
              <Search style={{ 
                width: '24px', 
                height: '24px', 
                color: '#4338ca'
              }} />
            </div>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div style={{ padding: '16px' }}>
        {/* Keyframe ID - Prominently Displayed */}
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '2px solid #3b82f6',
          borderRadius: '10px',
          padding: '12px 16px',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#1e40af',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Keyframe ID
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1e293b',
            letterSpacing: '0.5px',
            fontFamily: 'monospace'
          }}>
            {keyframe.keyframe_info}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyframeCard;