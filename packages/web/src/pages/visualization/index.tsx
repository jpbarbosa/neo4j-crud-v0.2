import { useState } from 'react';
import { Content } from './Content';

export const Visualization: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <div className="page">
      <div className="actions-bar">
        <h2>Graph Visualization</h2>
        <div className="filter">
          <input
            type="text"
            value={search}
            placeholder="Search by movie title or actor name..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Content search={search} />
    </div>
  );
};
