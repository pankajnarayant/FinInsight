import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinInsightProvider } from './context/FinInsightContext';
import HomeScreen from './pages/HomeScreen';
import ChatScreen from './pages/ChatScreen';
import PlanScreen from './pages/PlanScreen';
import OffersScreen from './pages/OffersScreen';

export default function App() {
  return (
    <FinInsightProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/plan" element={<PlanScreen />} />
          <Route path="/offers" element={<OffersScreen />} />
        </Routes>
      </BrowserRouter>
    </FinInsightProvider>
  );
}