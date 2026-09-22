import { FinInsightProvider } from './context/FinInsightContext';
import HomeScreen from './pages/HomeScreen';

export default function App() {
  return (
    <FinInsightProvider>
      <HomeScreen />
    </FinInsightProvider>
  );
}