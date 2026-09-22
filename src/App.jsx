import React from 'react';
import { FinInsightProvider, useFinInsight } from './context/FinInsightContext';
import HomeScreen from './pages/HomeScreen';
import ChatScreen from './pages/ChatScreen';
import PlanScreen from './pages/PlanScreen';

function AppRoutes() {
  const { currentRoute } = useFinInsight();

  if (currentRoute === '/chat') {
    return <ChatScreen />;
  }

  if (currentRoute === '/plan') {
    return <PlanScreen />;
  }

  return <HomeScreen />;
}

export default function App() {
  return (
    <FinInsightProvider>
      <AppRoutes />
    </FinInsightProvider>
  );
}