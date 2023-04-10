export type RelationshipKey =
  | 'ACTED_IN'
  | 'DIRECTED'
  | 'PRODUCED'
  | 'WROTE'
  | 'REVIEWED';

export type RelationshipCollection =
  | 'actors'
  | 'directors'
  | 'producers'
  | 'writers'
  | 'reviewers';

export type Relationship = {
  key: RelationshipKey;
  collection: RelationshipCollection;
};

export const relationships: Relationship[] = [
  {
    key: 'ACTED_IN',
    collection: 'actors',
  },
  {
    key: 'DIRECTED',
    collection: 'directors',
  },
  {
    key: 'PRODUCED',
    collection: 'producers',
  },
  {
    key: 'WROTE',
    collection: 'writers',
  },
  {
    key: 'REVIEWED',
    collection: 'reviewers',
  },
];

export const relationshipKeys: RelationshipKey[] = relationships.map(
  (relationship) => relationship.key
);

export const relationshipCollections: RelationshipCollection[] =
  relationships.map((relationship) => relationship.collection);
