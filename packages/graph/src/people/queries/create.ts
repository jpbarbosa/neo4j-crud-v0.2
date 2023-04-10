import { _return } from './_return';

export const create = `
  CREATE (person:Person)
  SET
    person.name = $person.name,
    person.born = $person.born

  ${_return}
`;
