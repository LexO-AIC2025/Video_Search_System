import React from 'react';
import KeyframeCard from './KeyframeCard';

const EventSequenceCard = ({ 
  sequence,
  onSelectKeyframe,
  onHoverKeyframe,
  onLeaveKeyframe,
  sequenceNumber
}) => {
  // sequence = { events: [{keyframe, eventIndex}, ...], score: number }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      border: '1px solid #e5e7eb'
    }}>
      {/* Sequence Header */}
      <div style={{
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '2px solid #f3f4f6'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            margin: 0
          }}>
            Chuỗi sự kiện #{sequenceNumber}
          </h3>
          {sequence.score && (
            <span style={{
              fontSize: '14px',
              color: '#6b7280',
              backgroundColor: '#f3f4f6',
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              Score: {sequence.score.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Event Sequence Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '20px',
        padding: '4px',
        gridAutoRows: 'auto'
      }}>
        {sequence.events.map((event, index) => (
          <div key={`${event.keyframe.id}-${index}`} style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Event Label */}
            <div style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '8px',
              borderRadius: '8px 8px 0 0',
              fontSize: '14px',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '-8px',
              zIndex: 1,
              position: 'relative'
            }}>
              Event {event.eventIndex + 1}
            </div>
            
            {/* Use the same KeyframeCard component as KIS */}
            <div style={{
              borderTop: '3px solid #4f46e5',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden'
            }}>
              <KeyframeCard
                keyframe={event.keyframe}
                onSelect={onSelectKeyframe}
                onHover={onHoverKeyframe}
                onLeave={onLeaveKeyframe}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default EventSequenceCard;