describe('User Flows', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders'
    })
  })

  it('Should display orders', () => {
    cy.get('h1').should('contain', 'Burrito Builder')
    .get('.order').should('have.length', 1)
  })
})