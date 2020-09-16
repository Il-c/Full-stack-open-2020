describe('Blog ', function() {
  before(function () {
    cy.visit('http://localhost:3000')
  })
  beforeEach(function() {

    cy.request('POST', '/api/testing/reset')
    const user = {
      name: 'Ilari Lehtinen',
      username: 'lehtinei',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })
  it('front page can be opened', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Log in to application')
      cy.get('#username').clear()
      cy.get('#password').clear()

    })
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('lehtinei')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('logged in')
    })
  })

  describe('When logged in',function() {
    beforeEach(function() {
      cy.request('POST', '/api/login', {
        username: 'lehtinei', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.createBlog({
          title: 'first blog cypress',
          author: 'Jooseppi Blogintekijä',
          url: 'www.blog.fi'
        })
        cy.createBlog({
          title: 'second blog',
          author: 'Ilari L',
          url: 'www.bloghyt.fi'
        })
        cy.createBlog({
          title: 'third blog',
          author: 'blogist',
          url: 'www.bloggers.com'
        })
      })
    })
    it('a blog can be created', function() {
      cy.get('#addBlogButton').click()
      cy.get('#Title').type('Fresh new testblog entry')
      cy.get('#Author').type('Illu')
      cy.get('#Url').type('www.bestblogs.net')
      cy.get('#createBlogButton').click()

      cy.contains('Fresh new testblog')
    })
    it('a blog can be liked', function() {

      cy.contains('first blog cypress').contains('view').as('theButton')
      cy.get('@theButton').click()

      cy.contains('0')
      cy.contains('first blog cypress').contains('like').as('theButton')
      cy.get('@theButton').click()
      cy.contains('1')
    })
    it('a blog can be removed', function() {

      cy.contains('first blog cypress').contains('view').as('theButton')
      cy.get('@theButton').click()

      cy.contains('first blog cypress').contains('remove').as('theButton')
      cy.get('@theButton').click()
      cy.on('window:confirm', () => true)
      cy.contains('first blog cypress').should('not.exist')
    })
    it('blogs are shown in ordered by likes', function() {
      cy.contains('second blog').contains('view').as('theButton')
      cy.get('@theButton').click()
      let i
      for ( i=0; i<2; i++ ){
        cy.contains('second blog').contains('like').as('theButton')
        cy.get('@theButton').click()
      }
      cy.visit('http://localhost:3000')
      cy.get('.blogItem').find('#viewButton').click({ 'multiple':true })
      cy.get('.blogItem').find('#likes').then($elements => {
        const strings = (Array.from($elements, el => el.innerText)).map(Number)
        //expect(strings).to.eq([...strings].sort().reverse())
        cy.wrap(strings).should('deep.equal', [...strings].sort().reverse())
      })
    })
  })
})