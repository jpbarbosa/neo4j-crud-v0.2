import { _return } from './_return';

export const getById = `
  MATCH (person:Person)
  WHERE id(person) = $id
  ${_return}
`;
