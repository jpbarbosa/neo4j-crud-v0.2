import { Route, Routes, Navigate } from 'react-router-dom';
import { Movies, People } from '../pages';
import { Header } from '../components';

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies/*" element={<Movies />} />
        <Route path="/people/*" element={<People />} />
      </Routes>
    </>
  );
}

export default App;
