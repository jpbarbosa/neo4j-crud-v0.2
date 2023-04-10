import { _return } from './_return';

export const getById = `
  MATCH (movie:Movie)
  WHERE id(movie) = $id
  ${_return}
`;
