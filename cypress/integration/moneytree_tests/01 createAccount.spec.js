/// <reference types="cypress" />

// IMPORTANT TEST NOTES - TEST 01 "createAccount" IS DESIGNED TO BE RUN WITH USER STATE NULL IN APP.JS (LINES 26-29).
// SUBSEQUENT TESTS ON THE LIST AND CARD CRUD REQUIRE THE USER TO BE SIGNED IN AND THEREFORE A JWT TOKEN IS NEEDED.
// THE MOST RELIABLE WAY TO RUN THOSE TESTS IS TO COMMENT OUT THE NULL USER AND HARDCODE A VALID USERNAME AND JWT.
// THESE TESTS ARE BEST RUN ON A LIVE SERVER; UNCOMMENT LINE 2 AND UNCOMMENT LINE 3 OF APIUtils.js

const { grey } = require("@material-ui/core/colors")

context('Auth', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/')
    })
    
    it('Test checkbox functionality for users who already have an account ', () => {
        cy.contains("Create Account")
        cy.get('[type="checkbox"]').click()
        cy.contains("I already have an account")
        cy.contains("Create Account").should("not.be.visible")        
        cy.get('[type="checkbox"]').click() 
    })
  
    it('Create new user', () => {
        cy.get('[placeholder="email@address"]').type("user@email.com")
        cy.get('[placeholder="password"]').type("password")
        cy.get('button').click()
    })

    // TEST NOT FUNCTIONAL BECAUSE COULD NOT GET CYPRESS TO RETAIN JWT. 
    // it('Check new user is logged in', () => {
    //     cy.contains('Dashboard')
    //     cy.get('#root > :nth-child(1)').click()
    //     cy.contains("Watch your money grow")        
    // })

})
  