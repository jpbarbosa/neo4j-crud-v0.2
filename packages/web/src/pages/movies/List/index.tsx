import { useState } from 'react';
import { Content } from './Content';

export const List = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <div>
      <div className="actions-bar">
        <h2>Movies</h2>
        <div className="filter">
          <input
            type="text"
            value={search}
            placeholder="Search by movie title or person name..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Content search={search} />
    </div>
  );
};
