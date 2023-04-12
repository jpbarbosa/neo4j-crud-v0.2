import { getGreeting } from '../support/app.po';

describe('web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the correct title', () => {
    getGreeting().contains('Neo4j Fullstack CRUD');
  });
});
