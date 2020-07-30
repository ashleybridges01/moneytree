/// <reference types="cypress" />

context('Auth', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/')
    })
    
    it('Test creation of first column', () => {
  
        // Select button to create a new list
        cy.get('.MuiTypography-root').click()

        // Put cursor in title field
        cy.get('.MuiInputBase-root').type("Create test column 1")    

        // Click on add list button to add item to backend
        cy.get('.MuiButton-label').click()

        // Test for existence of list title after creation
        cy.contains("column 1")
        
    })

    it('Test creation of second column', () => {
  
        // Select button to create a new list
        cy.get(':nth-child(2) > .MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > .MuiPaper-root > .MuiTypography-root').click()

        // Put cursor in title field
        cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > :nth-child(1) > .MuiPaper-root > .MuiInputBase-root > [rows="1"]').type("Create test column 2")    

        // Click on add list button to add item to backend
        cy.get('.MuiCollapse-entered > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > :nth-child(1) > .makeStyles-confirm-7 > .MuiButton-root > .MuiButton-label').click()

        // Test for existence of list title after creation
        cy.contains("column 2")
        
    })
    
})
  