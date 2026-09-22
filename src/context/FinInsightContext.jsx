import { createContext, useContext, useState } from 'react';

const FinInsightContext = createContext();

export const FinInsightProvider = ({ children }) => {
  const [selectedGoal, setSelectedGoal] = useState('Personal Loan');
  const [needAmount, setNeedAmount] = useState(200000);
  const [tenureMonths, setTenureMonths] = useState(24);
  const [interestRate, setInterestRate] = useState(14);
  const [existingEmi, setExistingEmi] = useState(8200);
  const [monthlyIncome, setMonthlyIncome] = useState(35000);
  const [userName, setUserName] = useState('Rahul Sharma');
  const [creditScore, setCreditScore] = useState(742);

  const value = {
    selectedGoal,
    setSelectedGoal,
    needAmount,
    setNeedAmount,
    tenureMonths,
    setTenureMonths,
    interestRate,
    setInterestRate,
    existingEmi,
    setExistingEmi,
    monthlyIncome,
    setMonthlyIncome,
    userName,
    setUserName,
    creditScore,
    setCreditScore,
  };

  return (
    <FinInsightContext.Provider value={value}>
      {children}
    </FinInsightContext.Provider>
  );
};

export const useFinInsight = () => useContext(FinInsightContext);
