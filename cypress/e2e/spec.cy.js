describe('User Flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'orders'
    })
    .visit('http://localhost:3000/')
  })

  it('Should display orders', () => {
    cy.get('h1').should('contain', 'Burrito Builder')
    .get('.order').should('have.length', 1)
  })

  it('Should allow a user to create an order', () => {
    cy.get('input').type('Kass')
    .get('button[name="beans"]').click()
    .get('button[name="steak"]').click()
    .get('p').should('contain', "Order: beans, steak")
    .intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/orders'
    }, {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "id": "2",
        "name": "Kass",
        "ingredients": ["beans", "steak"]
      }
    }).intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: "inputOrder"
    })
    .get('button[name="submit"]').click()
    .get('.order').should('have.length', 2)
  })

  it('Should give an error when the form is unfilled', () => {
    cy.get('button[name="submit"]').click()
    .get('.error').should('contain', 'Please fill out your order.')
    cy.get('input').type('Kass').get('button[name="submit"]').click()
    .get('.error').should('contain', 'Please select ingredients.')
    cy.get('input').clear()
    .get('button[name="beans"]').click()
    .get('button[name="steak"]').click()
    .get('button[name="submit"]').click()
    .get('.error').should('contain', 'Please input a name.')
  })
})