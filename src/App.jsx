import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinInsightProvider } from './context/FinInsightContext';
import PhoneFrame from './components/PhoneFrame';
import HomeScreen from './pages/HomeScreen';
import ChatScreen from './pages/ChatScreen';
import OffersScreen from './pages/OffersScreen';
import InsuranceOffersScreen from './pages/InsuranceOffersScreen';
import JourneyScreen from './pages/JourneyScreen';

export default function App() {
  return (
    <FinInsightProvider>
      <BrowserRouter>
        <PhoneFrame>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/offers" element={<OffersScreen />} />
            <Route path="/insurance-offers" element={<InsuranceOffersScreen />} />
            <Route path="/journey" element={<JourneyScreen />} />
          </Routes>
        </PhoneFrame>
      </BrowserRouter>
    </FinInsightProvider>
  );
}