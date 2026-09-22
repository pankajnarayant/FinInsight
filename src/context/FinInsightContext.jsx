import { createContext, useContext, useState } from 'react';

const FinInsightContext = createContext();

export const FinInsightProvider = ({ children }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [needAmount, setNeedAmount] = useState('');
  const [emiAmount, setEmiAmount] = useState('');

  const value = {
    selectedGoal,
    setSelectedGoal,
    needAmount,
    setNeedAmount,
    emiAmount,
    setEmiAmount,
  };

  return (
    <FinInsightContext.Provider value={value}>
      {children}
    </FinInsightContext.Provider>
  );
};

export const useFinInsight = () => useContext(FinInsightContext);
