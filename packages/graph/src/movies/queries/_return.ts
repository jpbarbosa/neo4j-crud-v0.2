export const _return = `
  RETURN DISTINCT movie {
    .*,
    id: id(movie),
    people: {
      actors: [ (person:Person)-[r:ACTED_IN]->(movie) | person { .*, id: id(person), roles: r.roles } ],
      directors: [ (person:Person)-[r:DIRECTED]->(movie) | person { .*, id: id(person) } ],
      producers: [ (person:Person)-[r:PRODUCED]->(movie) | person { .*, id: id(person) } ],
      writers: [ (person:Person)-[r:WROTE]->(movie) | person { .*, id: id(person) } ],
      reviewers: [ (person:Person)-[r:REVIEWED]->(movie) | person { .*, id: id(person) } ]
    }
  }
`;
