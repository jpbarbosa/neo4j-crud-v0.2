import {
  PersonMovie,
  Relationship,
  stringToTitleCase,
} from '@neo4j-crud/shared';
import { HighlightedText } from '../../../components';

type PersonMoviesProps = {
  relationship: Relationship;
  movies: PersonMovie[];
  search: string;
};

export const PersonMovies: React.FC<PersonMoviesProps> = ({
  relationship,
  movies,
  search,
}) => {
  const filteredMovies = movies.filter(
    (movie) => movie.relationship === relationship.key
  );

  if (filteredMovies.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <b>{stringToTitleCase(relationship.key)}:</b>
      <HighlightedText
        text={filteredMovies.map((movie) => movie.title).join(', ')}
        search={search}
      />
    </div>
  );
};
