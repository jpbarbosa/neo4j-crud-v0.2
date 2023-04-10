export const remove = `
  MATCH (person:Person)
  WHERE id(person) = $id
  DETACH DELETE person
`;
