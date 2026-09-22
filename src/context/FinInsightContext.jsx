import { createContext, useContext, useState, useEffect } from 'react';

const FinInsightContext = createContext();

export const FinInsightProvider = ({ children }) => {
  // User Profile from Home Screen
  const userProfile = {
    name: 'Rahul Sharma',
    credit_score: 742,
    credit_status: 'Good',
    pre_approved_amount: 240000,
    pre_approved_formatted: '₹2,40,000',
    existing_emi: 8200,
    existing_emi_formatted: '₹8,200/month',
    existing_savings: '₹1.2L (FD + Savings)',
  };

  // Financial Plan captured in Chat Screen
  const [financialPlan, setFinancialPlan] = useState({
    purpose: null,
    amount: null,
    amount_formatted: '',
    new_emi_preference: null,
    new_emi_formatted: '',
    tenure: null,
  });

  const [entryBranch, setEntryBranch] = useState('LOAN');
  const [initialPurpose, setInitialPurpose] = useState(null);

  // Lightweight client-side router
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/chat' || path === '/plan') return path;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentRoute(path === '/chat' || path === '/plan' ? path : '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path, options = {}) => {
    if (options.entryBranch) {
      setEntryBranch(options.entryBranch);
    }
    if (options.initialPurpose !== undefined) {
      setInitialPurpose(options.initialPurpose);
    } else {
      setInitialPurpose(null);
    }
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
    }
    setCurrentRoute(path);
  };

  const updatePlan = (updates) => {
    setFinancialPlan((prev) => ({ ...prev, ...updates }));
  };

  const resetPlan = () => {
    setFinancialPlan({
      purpose: null,
      amount: null,
      amount_formatted: '',
      new_emi_preference: null,
      new_emi_formatted: '',
      tenure: null,
    });
  };

  const value = {
    ...userProfile,
    financialPlan,
    updatePlan,
    resetPlan,
    entryBranch,
    setEntryBranch,
    initialPurpose,
    setInitialPurpose,
    currentRoute,
    navigate,
  };

  return (
    <FinInsightContext.Provider value={value}>
      {children}
    </FinInsightContext.Provider>
  );
};

export const useFinInsight = () => {
  const context = useContext(FinInsightContext);
  if (!context) {
    throw new Error('useFinInsight must be used within a FinInsightProvider');
  }
  return context;
};
