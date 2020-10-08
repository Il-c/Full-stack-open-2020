
import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  
  const [addVisibility, setAddVisibility] = useState({visibility: 'hidden'})
  

  useEffect (() =>{
    const token = localStorage.getItem('library-user-token')
    if (token){
      setToken(token)
      setAddVisibility({visibility: 'visible'})
    } else {
      setAddVisibility({visibility: 'hidden'})
      if((page==='add')||(page==='recommend')){
        setPage('books')
      }
    }
  },[token])
  
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log('not found, adding');
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`book ${addedBook.title} added to database!`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    localStorage.clear()
    client.resetStore()
    setToken(null)
  }
   return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={addVisibility} onClick={() => setPage('add')}>add book</button>
        <button style={addVisibility} onClick={() => setPage('recommend')}>recommendations</button>
        <button   
          onClick={token?() => logout():() => setPage('login')}>
            {token?'logout':'login'}
        </button>
        
      </div>
      <LoginForm 
        show={page === 'login'} setToken={setToken} token={token}
      />

      <Authors
        show={page === 'authors'} token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
        />
    </div>
  )
}

export default App