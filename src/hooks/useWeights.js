import { useState } from 'react';
import { DEFAULT_WEIGHTS } from '../utils/constants';

export const useWeights = () => {
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  const handleWeightChange = (type, value) => {
    setWeights(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return { weights, handleWeightChange };
};