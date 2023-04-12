describe('movies', () => {
  beforeEach(() => cy.visit('/movies'));

  it('should display movies', () => {
    cy.get('.record-list li').should('have.length.at.least', 1);
  });
});
