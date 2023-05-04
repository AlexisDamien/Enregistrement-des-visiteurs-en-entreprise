import '../css/App.css';
import { Route, Routes } from 'react-router-dom';
import Visits from './Visits';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Visits />} />
    </Routes>
  );
}
