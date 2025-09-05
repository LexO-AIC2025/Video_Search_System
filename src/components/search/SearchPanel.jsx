import React, { useState } from 'react';
import KISSearch from './KISSearch';
import EventSequence from './EventSequence';
import TRAKEControls from './TRAKEControls';
import AdvancedTuning from './AdvancedTuning';
import Filters from './Filters';
import SearchControls from './SearchControls';
import { TABS } from '../../utils/constants';

const SearchPanel = ({
  activeTab,
  // KIS props
  searchQuery,
  onSearchChange,
  topK,
  onTopKChange,
  kisQueryImage,
  onKisImageUpload,
  onKisImageRemove,
  onKISSearch,
  kisWeights,
  onKisWeightChange,
  kisShowAdvancedTuning,
  onToggleKisAdvancedTuning,
  kisFilters,
  onKisFilterChange,
  kisShowFilters,
  onToggleKisFilters,
  // TRAKE props
  eventSequence,
  onEventAdd,
  onEventRemove,
  onEventUpdate,
  trakeTopK,
  onTrakeTopKChange,
  onTRAKESubmit,
  trakeQueryImage,
  onTrakeImageUpload,
  onTrakeImageRemove,
  trakeWeights,
  onTrakeWeightChange,
  trakeShowAdvancedTuning,
  onToggleTrakeAdvancedTuning,
  trakeFilters,
  onTrakeFilterChange,
  trakeShowFilters,
  onToggleTrakeFilters
}) => {
  // Local state for TRAKE expandable sections
  const [showEventSequence, setShowEventSequence] = useState(true);
  const [showTRAKEAdvanced, setShowTRAKEAdvanced] = useState(false);
  const [showTRAKEFilters, setShowTRAKEFilters] = useState(false);
  const renderContent = () => {
    switch (activeTab) {
      case TABS.KIS:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <KISSearch 
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              queryImage={kisQueryImage}
              onImageUpload={onKisImageUpload}
              onImageRemove={onKisImageRemove}
            />
            
            <Filters
              filters={kisFilters}
              onFilterChange={onKisFilterChange}
              isExpanded={kisShowFilters}
              onToggle={onToggleKisFilters}
            />
            
            <AdvancedTuning
              weights={kisWeights}
              onWeightChange={onKisWeightChange}
              isExpanded={kisShowAdvancedTuning}
              onToggle={onToggleKisAdvancedTuning}
            />
            
            <SearchControls
              topK={topK}
              onTopKChange={onTopKChange}
              onSearch={onKISSearch}
            />
          </div>
        );
      
      
      case TABS.TRAKE:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <EventSequence
              eventSequence={eventSequence}
              onEventAdd={onEventAdd}
              onEventRemove={onEventRemove}
              onEventUpdate={onEventUpdate}
              isExpanded={showEventSequence}
              onToggle={() => setShowEventSequence(!showEventSequence)}
              queryImage={trakeQueryImage}
              onImageUpload={onTrakeImageUpload}
              onImageRemove={onTrakeImageRemove}
            />
            
            <Filters
              filters={trakeFilters}
              onFilterChange={onTrakeFilterChange}
              isExpanded={showTRAKEFilters}
              onToggle={() => setShowTRAKEFilters(!showTRAKEFilters)}
            />
            
            <AdvancedTuning
              weights={trakeWeights}
              onWeightChange={onTrakeWeightChange}
              isExpanded={showTRAKEAdvanced}
              onToggle={() => setShowTRAKEAdvanced(!showTRAKEAdvanced)}
            />
            
            <TRAKEControls
              topK={trakeTopK}
              onTopKChange={onTrakeTopKChange}
              onSubmit={onTRAKESubmit}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return <div>{renderContent()}</div>;
};

export default SearchPanel;