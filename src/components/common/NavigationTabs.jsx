import React from 'react';
import { TABS } from '../../utils/constants';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: TABS.KIS, label: 'Search & Question Answering (KIS)' },
    { id: TABS.TRAKE, label: 'Event Sequence (TRAKE)' }
  ];

  return (
    <div style={{ marginBottom: '32px' }}>
      <nav style={{ 
        display: 'flex', 
        gap: '32px', 
        borderBottom: '1px solid #e5e7eb' 
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 4px',
              borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
              fontWeight: '500',
              fontSize: '14px',
              color: activeTab === tab.id ? '#4f46e5' : '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default NavigationTabs;