import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FinInsightProvider } from './context/FinInsightContext';
import PhoneFrame from './components/PhoneFrame';
import HomeScreen from './pages/HomeScreen';
import ChatScreen from './pages/ChatScreen';
import OffersScreen from './pages/OffersScreen';

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
          </Routes>
        </PhoneFrame>
      </BrowserRouter>
    </FinInsightProvider>
  );
}