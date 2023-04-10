import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationAlert } from '../../../components';
import { Content } from './Content';

export const List = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <div>
      <div className="actions-bar">
        <h2>People</h2>
        <div className="filter">
          <input
            type="text"
            value={search}
            placeholder="Search by person name or movie title..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Link to="new" className="button primary">
            Create Person
          </Link>
        </div>
      </div>
      <NavigationAlert />
      <Content search={search} />
    </div>
  );
};
