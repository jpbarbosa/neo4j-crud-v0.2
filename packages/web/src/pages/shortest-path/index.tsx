import { Person } from '@neo4j-crud/shared';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from '../../api';
import { Content } from './Content';
import { SelectPerson } from './SelectPerson';

export const ShortestPath: React.FC = () => {
  const [person1, setPerson1] = useState<string>('Tom Cruise');
  const [person2, setPerson2] = useState<string>('Tom Hanks');

  const { data: people } = useQuery<Person[]>('select-people', () =>
    api.people.getAll()
  );

  return (
    <div className="page">
      <div className="actions-bar">
        <h2>Shortest Path</h2>
        {people ? (
          <div className="filter">
            <SelectPerson
              data={people}
              value={person1}
              otherValue={person2}
              onChange={(e) => setPerson1(e.target.value)}
            />
            <SelectPerson
              data={people}
              value={person2}
              otherValue={person1}
              onChange={(e) => setPerson2(e.target.value)}
            />
          </div>
        ) : (
          <span>Loading</span>
        )}
      </div>
      <Content person1={person1} person2={person2} />
    </div>
  );
};
