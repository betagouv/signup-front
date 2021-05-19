import { useState } from 'react';

export const useFormSubmission = () => {
  const [loading, setLoading] = useState(false);

  return {
    loading,
  };
};
