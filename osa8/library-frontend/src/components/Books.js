import React, {useEffect, useState} from 'react'
import { useQuery, useLazyQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOKS_IN_GENRE, BOOK_ADDED } from '../queries'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [booksToShow, setBooksToShow] = useState([])
  const [genreBooks, result] = useLazyQuery(BOOKS_IN_GENRE)
  const books = useQuery(ALL_BOOKS)
  
  
  useEffect (() =>{
    if (books.data){
      let uniqueGenres = []
      books.data.allBooks.map(book => book.genres.map(genre => uniqueGenres.includes(genre)?null:uniqueGenres.push(genre)))
      setBooksToShow(books.data.allBooks)
      setGenres(uniqueGenres)
    }
  },[books.data])
  
  useEffect (() =>{
    if (result.data){
      setBooksToShow(result.data.allBooks)
    }
  },[result])

  const filterBooks = (genre) => {
    genreBooks({variables: {genre:genre}})
  }

  /*const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }*/

  /*const filterBooks = (genre) => {
    const filteredBooks = books.data.allBooks.filter(book=> book.genres.includes(genre))
    setBooksToShow(filteredBooks)
  }*/
 
  if (!props.show) {
    return null
  }
  if (!booksToShow) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>
      {genres.map(genre =>
        <button key={genre} onClick={()=>filterBooks(genre)}>{genre}</button>
        )}
      </p>
    </div>
  )
}


export default Books