/// <reference types="cypress" />

context('CardCRUD', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/')
    })
    

    it('Test creation individual cards', () => {
  
        // Click on "Add card" icon
        cy.contains('Add a Card').click()

        // Select title field
        cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiInputBase-root').type("Add card 1 in list 1")

        // Select amount field
        cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > :nth-child(1) > :nth-child(2) > .MuiInputBase-root').type(1000)

        // Click on "Enter card" to save
        cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > .makeStyles-confirm-7 > .MuiButton-root > .MuiButton-label').click()

        // Verify that card has been recognised
        cy.contains("card 1 in list 1")        

        // Test ability to delete card
        cy.get('.MuiPaper-root > .MuiSvgIcon-root').click()
        cy.contains("card 1 in list 1").should("not.be.visible")        

        // Create a revised card:
        // Click on "Add card" icon
        cy.contains('Add a Card').click()

        // Select title field
        cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > :nth-child(1) > :nth-child(1) > .MuiInputBase-root').type("Revised card in list 1")

        // Click on "Enter card" to save
        cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > .makeStyles-confirm-7 > .MuiButton-root > .MuiButton-label').click()

        // Verify that card has been recognised
        cy.contains("Revised card in list 1")       

    })


})
  