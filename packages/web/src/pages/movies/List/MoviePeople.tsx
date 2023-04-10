import {
  MoviePerson,
  Relationship,
  stringToTitleCase,
} from '@neo4j-crud/shared';
import { HighlightedText } from '../../../components';

type MoviePeopleProps = {
  relationship: Relationship;
  people: MoviePerson[];
  search: string;
};

export const MoviePeople: React.FC<MoviePeopleProps> = ({
  relationship,
  search,
  people,
}) => {
  if (people.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <b>{stringToTitleCase(relationship.key)}:</b>
      <HighlightedText
        text={people.map((person) => person.name).join(', ')}
        search={search}
      />
    </div>
  );
};
