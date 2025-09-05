export const filterKeyframes = (keyframes, query, filters) => {
  return keyframes.filter(kf => {
    // Text search
    const matchesQuery = !query || 
      kf.caption_vlm.toLowerCase().includes(query.toLowerCase()) ||
      kf.ocr_text.toLowerCase().includes(query.toLowerCase()) ||
      kf.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

    // Filters
    const matchesTags = !filters.tags || 
      kf.tags.some(tag => tag.toLowerCase().includes(filters.tags.toLowerCase()));
    
    const matchesOCR = !filters.ocr_contains || 
      kf.ocr_text.toLowerCase().includes(filters.ocr_contains.toLowerCase());
    
    const matchesMinTime = !filters.start_time_min || 
      kf.start_time_s >= parseFloat(filters.start_time_min);
    
    const matchesMaxTime = !filters.start_time_max || 
      kf.start_time_s <= parseFloat(filters.start_time_max);

    return matchesQuery && matchesTags && matchesOCR && matchesMinTime && matchesMaxTime;
  });
};

export const groupResultsByVideo = (results) => {
  const grouped = results.reduce((acc, keyframe) => {
    if (!acc[keyframe.video_id]) {
      acc[keyframe.video_id] = [];
    }
    acc[keyframe.video_id].push(keyframe);
    return acc;
  }, {});

  // Sort video IDs alphabetically to ensure L01 comes before L02, L03, etc.
  const sortedEntries = Object.entries(grouped).sort(([a], [b]) => {
    return a.localeCompare(b, undefined, { numeric: true });
  });

  // Convert back to object maintaining order
  return Object.fromEntries(sortedEntries);
};