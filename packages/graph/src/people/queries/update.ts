import { _return } from './_return';

export const update = `
  MATCH (person:Person)
  WHERE id(person) = $id
  SET
    person.name = $person.name,
    person.born = $person.born

  ${_return}
`;
