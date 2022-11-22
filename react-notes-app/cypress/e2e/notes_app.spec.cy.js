describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'john',
      username: 'john',
      password: 'radar'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('john')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('john')
    cy.get('#password').type('radar')
    cy.get('#login-button').click()

    cy.contains('john logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      // cy.contains('login').click()
      // cy.get('input:first').type('john')
      // cy.get('input:last').type('radar')
      // cy.get('#login-button').click()
      cy.login({ username: 'john', password: 'radar' })
    })

    it('a new note can be created', function() {
      cy.contains('create a new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
    // describe('and a note exists', function () {
    //   beforeEach(function () {
    //     cy.contains('create a new note').click()
    //     cy.get('input').type('another note cypress')
    //     cy.contains('save').click()
    //   })

    //   it('it can be made important', function () {
    //     cy.contains('another note cypress')
    //       .contains('make important')
    //       .click()

    //     cy.contains('another note cypress')
    //       .contains('make not important')
    //   })
    // })
    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
  
      it('one of those can be made important', function () {
        cy.contains('second note')
          .contains('make important')
          .click()
  
        cy.contains('second note')
          .contains('make not important')
      })
    })

  })
  })