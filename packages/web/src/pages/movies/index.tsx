import { Route, Routes } from 'react-router-dom';
import { List } from './List';

export const Movies = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/:id/edit" element={<div>To be implemented</div>} />
      <Route path="/new" element={<div>To be implemented</div>} />
    </Routes>
  );
};
