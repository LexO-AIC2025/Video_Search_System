import React, { useRef } from 'react';
import { Search, Upload, X, Image } from 'lucide-react';

const KISSearch = ({ 
  searchQuery, 
  onSearchChange,
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
      <h3 style={{ 
        fontSize: '18px', 
        fontWeight: '600', 
        marginBottom: '16px', 
        margin: '0 0 16px 0' 
      }}>
        Truy vấn
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Search style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '12px', 
            width: '16px', 
            height: '16px', 
            color: '#9ca3af' 
          }} />
          <input
            type="text"
            placeholder="Mô tả những gì bạn đang tìm kiếm..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '16px',
              paddingTop: '8px',
              paddingBottom: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
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
    </div>
  );
};

export default KISSearch;