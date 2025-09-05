import React, { useRef } from 'react';
import { Plus, Minus, ChevronDown, ChevronUp, Upload, X, Image } from 'lucide-react';

const EventSequence = ({ 
  eventSequence, 
  onEventAdd, 
  onEventRemove, 
  onEventUpdate,
  isExpanded,
  onToggle,
  queryImage,
  onImageUpload,
  onImageRemove
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '24px', 
      borderRadius: '8px', 
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: isExpanded ? '16px' : '0'
        }}
      >
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          margin: 0,
          color: '#111827'
        }}>
          Truy vấn
        </h3>
        {isExpanded ? (
          <ChevronUp style={{ width: '20px', height: '20px', color: '#6b7280' }} />
        ) : (
          <ChevronDown style={{ width: '20px', height: '20px', color: '#6b7280' }} />
        )}
      </div>

      {isExpanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {eventSequence.map((event, index) => (
            <div key={event.id} style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '8px', 
              padding: '16px',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '8px' 
              }}>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#374151' 
                }}>
                  Event {index + 1}
                </span>
                {eventSequence.length > 1 && (
                  <button
                    onClick={() => onEventRemove(event.id)}
                    style={{
                      color: '#ef4444',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <Minus style={{ width: '16px', height: '16px' }} />
                  </button>
                )}
              </div>
              
              <textarea
                placeholder="Describe this event..."
                value={event.description}
                onChange={(e) => onEventUpdate(event.id, 'description', e.target.value)}
                rows={2}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          ))}
          
          <button
            onClick={onEventAdd}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <Plus style={{ width: '16px', height: '16px', marginRight: '8px' }} />
            Add Event
          </button>
          
          {queryImage ? (
            <div style={{
              position: 'relative',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Image style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                <img 
                  src={queryImage} 
                  alt="Query" 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    objectFit: 'cover', 
                    borderRadius: '4px' 
                  }} 
                />
                <span style={{ 
                  flex: 1, 
                  fontSize: '14px', 
                  color: '#374151' 
                }}>
                  Ảnh đã tải lên
                </span>
                <button
                  onClick={onImageRemove}
                  style={{
                    padding: '4px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  <X style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                <Upload style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Tải lên hình ảnh
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EventSequence;