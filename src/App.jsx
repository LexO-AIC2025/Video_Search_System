import React, { useState } from 'react';
import Header from './components/common/Header';
import NavigationTabs from './components/common/NavigationTabs';
import SearchPanel from './components/search/SearchPanel';
import KeyframeCard from './components/results/KeyframeCard';
import EventSequenceCard from './components/results/EventSequenceCard';
import { useSearch } from './hooks/useSearch';
import { useWeights } from './hooks/useWeights';
import { useEventSequence } from './hooks/useEventSequence';
import { formatTime } from './utils/timeUtils';
import { groupResultsByVideo } from './utils/searchUtils';
import { TABS, VIEW_MODES, DEFAULT_FILTERS } from './utils/constants';
import { Grid, List, X } from 'lucide-react';

const App = () => {
  // State management
  const [activeTab, setActiveTab] = useState(TABS.KIS);
  const [searchQuery, setSearchQuery] = useState('');
  const [trakeTopK, setTrakeTopK] = useState(5);
  const [viewMode, setViewMode] = useState(VIEW_MODES.KEYFRAMES);
  const [topK, setTopK] = useState(50);
  
  // KIS tab state
  const [kisFilters, setKisFilters] = useState(DEFAULT_FILTERS);
  const [kisQueryImage, setKisQueryImage] = useState(null);
  const [kisShowAdvancedTuning, setKisShowAdvancedTuning] = useState(false);
  const [kisShowFilters, setKisShowFilters] = useState(false);
  
  // TRAKE tab state  
  const [trakeFilters, setTrakeFilters] = useState(DEFAULT_FILTERS);
  const [trakeQueryImage, setTrakeQueryImage] = useState(null);
  const [trakeShowAdvancedTuning, setTrakeShowAdvancedTuning] = useState(false);
  const [trakeShowFilters, setTrakeShowFilters] = useState(false);
  
  // Import mock event sequences
  const { mockEventSequences } = require('./data/mockData');
  const [trakeResults, setTrakeResults] = useState(mockEventSequences);
  
  // UI state
  const [selectedKeyframe, setSelectedKeyframe] = useState(null);
  const [hoveredKeyframe, setHoveredKeyframe] = useState(null);
  
  // Custom hooks
  const { results, isLoading, performSearch } = useSearch();
  const { weights: kisWeights, handleWeightChange: handleKisWeightChange } = useWeights();
  const { weights: trakeWeights, handleWeightChange: handleTrakeWeightChange } = useWeights();
  const { eventSequence, addEvent, removeEvent, updateEvent } = useEventSequence();

  // Handlers for KIS search
  const handleKISSearch = () => {
    if (activeTab === TABS.KIS) {
      performSearch({
        queryText: searchQuery,
        queryImage: kisQueryImage,
        weights: kisWeights,
        filters: kisFilters,
        topK: topK
      });
    }
  };

  const handleKisImageUpload = (imageData) => {
    setKisQueryImage(imageData);
  };

  const handleKisImageRemove = () => {
    setKisQueryImage(null);
  };

  const handleTrakeImageUpload = (imageData) => {
    setTrakeQueryImage(imageData);
  };

  const handleTrakeImageRemove = () => {
    setTrakeQueryImage(null);
  };

  // Handlers
  const handleKeyframeSelect = (keyframe) => {
    setSelectedKeyframe(keyframe);
  };

  const handleKeyframeHover = (keyframe) => {
    setHoveredKeyframe(keyframe);
  };

  const handleKeyframeLeave = () => {
    setHoveredKeyframe(null);
  };


  const handleTRAKESubmit = () => {
    const events = eventSequence.map(event => ({
      description: event.description
    }));
    
    console.log('TRAKE Submit:', {
      events: events,
      top_k: trakeTopK
    });
    
    // Mock TRAKE results - create event sequences from available keyframes
    const mockTrakeResults = [];
    const availableKeyframes = results.length > 0 ? results : 
      require('./data/mockData').mockKeyframes;
    
    // Generate mock event sequences based on number of events
    for (let i = 0; i < Math.min(trakeTopK, 5); i++) {
      const sequence = {
        events: eventSequence.map((event, eventIndex) => {
          // Select a random keyframe for each event
          const keyframeIndex = (i * eventSequence.length + eventIndex) % availableKeyframes.length;
          return {
            keyframe: availableKeyframes[keyframeIndex],
            eventIndex: eventIndex
          };
        }),
        score: 0.95 - (i * 0.1) // Mock descending scores
      };
      mockTrakeResults.push(sequence);
    }
    
    setTrakeResults(mockTrakeResults);
  };

  // Data processing
  const groupedResults = groupResultsByVideo(results);

  const renderResults = () => {
    // For TRAKE tab, display event sequences
    if (activeTab === TABS.TRAKE) {
      if (!trakeResults || trakeResults.length === 0) {
        return (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ color: '#6b7280', fontSize: '18px' }}>Không tìm thấy chuỗi sự kiện</div>
            <div style={{ color: '#9ca3af', fontSize: '14px', marginTop: '8px' }}>
              Thêm các sự kiện và nhấn tìm kiếm để xem kết quả
            </div>
          </div>
        );
      }
      
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {trakeResults.map((sequence, index) => (
            <EventSequenceCard
              key={index}
              sequence={sequence}
              sequenceNumber={index + 1}
              onSelectKeyframe={handleKeyframeSelect}
              onHoverKeyframe={handleKeyframeHover}
              onLeaveKeyframe={handleKeyframeLeave}
            />
          ))}
        </div>
      );
    }
    
    // For KIS tab, display regular keyframes
    if (!results || results.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ color: '#6b7280', fontSize: '18px' }}>Không tìm thấy kết quả</div>
          <div style={{ color: '#9ca3af', fontSize: '14px', marginTop: '8px' }}>
            Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc
          </div>
        </div>
      );
    }

    if (viewMode === VIEW_MODES.KEYFRAMES) {
      return (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(6, 1fr)', 
          gap: '24px',
          padding: '4px',
          gridAutoRows: 'min-content',
          maxWidth: '100%'
        }}>
          {results.map(keyframe => (
            <KeyframeCard
              key={keyframe.id}
              keyframe={keyframe}
              onSelect={handleKeyframeSelect}
              onHover={handleKeyframeHover}
              onLeave={handleKeyframeLeave}
            />
          ))}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {Object.entries(groupedResults).map(([videoId, keyframes]) => (
          <div key={videoId} style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
            padding: '24px' 
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '16px', 
              margin: '0 0 16px 0' 
            }}>
              Video: {videoId}
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(6, 1fr)', 
              gap: '20px',
              padding: '4px',
              gridAutoRows: 'min-content',
              maxWidth: '100%'
            }}>
              {keyframes.map(keyframe => (
                <KeyframeCard
                  key={keyframe.id}
                  keyframe={keyframe}
                  onSelect={handleKeyframeSelect}
                  onHover={handleKeyframeHover}
                  onLeave={handleKeyframeLeave}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header />

      <div style={{ maxWidth: '100vw', margin: '0 auto', padding: '32px 16px' }}>
        <NavigationTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '32px' }}>
          {/* Search Panel */}
          <div>
            <SearchPanel
              activeTab={activeTab}
              // KIS props
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              topK={topK}
              onTopKChange={setTopK}
              kisQueryImage={kisQueryImage}
              onKisImageUpload={handleKisImageUpload}
              onKisImageRemove={handleKisImageRemove}
              onKISSearch={handleKISSearch}
              kisWeights={kisWeights}
              onKisWeightChange={handleKisWeightChange}
              kisShowAdvancedTuning={kisShowAdvancedTuning}
              onToggleKisAdvancedTuning={() => setKisShowAdvancedTuning(!kisShowAdvancedTuning)}
              kisFilters={kisFilters}
              onKisFilterChange={setKisFilters}
              kisShowFilters={kisShowFilters}
              onToggleKisFilters={() => setKisShowFilters(!kisShowFilters)}
              // TRAKE props
              eventSequence={eventSequence}
              onEventAdd={addEvent}
              onEventRemove={removeEvent}
              onEventUpdate={updateEvent}
              trakeTopK={trakeTopK}
              onTrakeTopKChange={setTrakeTopK}
              onTRAKESubmit={handleTRAKESubmit}
              trakeQueryImage={trakeQueryImage}
              onTrakeImageUpload={handleTrakeImageUpload}
              onTrakeImageRemove={handleTrakeImageRemove}
              trakeWeights={trakeWeights}
              onTrakeWeightChange={handleTrakeWeightChange}
              trakeShowAdvancedTuning={trakeShowAdvancedTuning}
              onToggleTrakeAdvancedTuning={() => setTrakeShowAdvancedTuning(!trakeShowAdvancedTuning)}
              trakeFilters={trakeFilters}
              onTrakeFilterChange={setTrakeFilters}
              trakeShowFilters={trakeShowFilters}
              onToggleTrakeFilters={() => setTrakeShowFilters(!trakeShowFilters)}
            />
          </div>

          {/* Results Panel */}
          <div>
            {/* Results Header */}
            <div style={{ 
              marginBottom: '24px',
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                margin: '0 0 8px 0',
                color: '#111827'
              }}>
                {activeTab === TABS.TRAKE ? 'Chuỗi Sự kiện' : 'Hiển thị Keyframes'}
              </h2>
              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280' 
              }}>
                {activeTab === TABS.TRAKE 
                  ? `${trakeResults.length} chuỗi sự kiện tìm thấy`
                  : `${results.length} kết quả tìm thấy`}
              </div>
            </div>
            
            {/* View Toggle - Only show for KIS tab */}
            {activeTab === TABS.KIS && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '24px' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => setViewMode(VIEW_MODES.KEYFRAMES)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      backgroundColor: viewMode === VIEW_MODES.KEYFRAMES ? '#eef2ff' : 'transparent',
                      color: viewMode === VIEW_MODES.KEYFRAMES ? '#4338ca' : '#6b7280',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Grid style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Hiển thị Keyframes
                  </button>
                  <button
                    onClick={() => setViewMode(VIEW_MODES.VIDEOS)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      backgroundColor: viewMode === VIEW_MODES.VIDEOS ? '#eef2ff' : 'transparent',
                      color: viewMode === VIEW_MODES.VIDEOS ? '#4338ca' : '#6b7280',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <List style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    Nhóm theo Video
                  </button>
                </div>
              </div>
            )}

            {renderResults()}
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredKeyframe && (
        <div 
          style={{
            position: 'fixed',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            maxWidth: '300px',
            pointerEvents: 'none',
            zIndex: 50
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
            {hoveredKeyframe.keyframe_info}
          </div>
          <div style={{ fontSize: '13px', fontWeight: '400', marginBottom: '8px' }}>
            {hoveredKeyframe.caption_vlm}
          </div>
          {hoveredKeyframe.ocr_text && (
            <div style={{ fontSize: '12px', color: '#93c5fd', marginBottom: '8px' }}>
              OCR: {hoveredKeyframe.ocr_text}
            </div>
          )}
          {hoveredKeyframe.asr_text && (
            <div style={{ fontSize: '12px', color: '#60a5fa', marginBottom: '8px' }}>
              ASR: {hoveredKeyframe.asr_text}
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#d1d5db', marginBottom: '8px' }}>
            Time: {formatTime(hoveredKeyframe.start_time_s)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {hoveredKeyframe.tags.map(tag => (
              <span 
                key={tag} 
                style={{ 
                  fontSize: '12px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  padding: '2px 8px', 
                  borderRadius: '4px' 
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedKeyframe && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            maxWidth: '1024px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                Video Player
              </h3>
              <button
                onClick={() => setSelectedKeyframe(null)}
                style={{
                  color: '#9ca3af',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X style={{ width: '24px', height: '24px' }} />
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <div style={{
                aspectRatio: '16/9',
                backgroundColor: '#111827',
                borderRadius: '8px',
                marginBottom: '16px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <video 
                  controls
                  autoPlay
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'contain'
                  }}
                  src={`${selectedKeyframe.video_url}#t=${selectedKeyframe.start_time_s}`}
                >
                  Your browser does not support the video tag.
                </video>
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {selectedKeyframe.keyframe_info}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <KeyframeCard keyframe={selectedKeyframe} isInModal={true} />
                </div>
                <div>
                  <h4 style={{ 
                    fontWeight: '500', 
                    color: '#111827', 
                    marginBottom: '8px', 
                    margin: '0 0 8px 0' 
                  }}>
                    Details
                  </h4>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#6b7280', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px' 
                  }}>
                    <div><strong>Keyframe:</strong> {selectedKeyframe.keyframe_info}</div>
                    <div><strong>Video ID:</strong> {selectedKeyframe.video_id}</div>
                    <div><strong>Start Time:</strong> {formatTime(selectedKeyframe.start_time_s)}</div>
                    <div><strong>Caption:</strong> {selectedKeyframe.caption_vlm}</div>
                    {selectedKeyframe.asr_text && (
                      <div><strong>ASR Text:</strong> {selectedKeyframe.asr_text}</div>
                    )}
                    {selectedKeyframe.ocr_text && (
                      <div><strong>OCR Text:</strong> {selectedKeyframe.ocr_text}</div>
                    )}
                    <div><strong>Tags:</strong> {selectedKeyframe.tags.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;