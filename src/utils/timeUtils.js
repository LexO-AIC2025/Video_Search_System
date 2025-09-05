export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const parseTime = (timeString) => {
  const [mins, secs] = timeString.split(':').map(Number);
  return mins * 60 + secs;
};