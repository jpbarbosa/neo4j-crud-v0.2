export const get = `
  WITH
    $person1 AS person1,
    $person2 AS person2
  MATCH path = shortestPath((p1:Person {name: person1})-[*]-(p2:Person {name: person2}))
  RETURN path
`;
