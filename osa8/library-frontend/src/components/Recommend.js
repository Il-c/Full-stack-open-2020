import React, {useEffect, useState} from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Books = (props) => {
  const [user, setUser] = useState([])
  const [booksToShow, setBooksToShow] = useState([])
  
  const books = useQuery(ALL_BOOKS)
  const data = useQuery(ME, {
    onCompleted: (data) => setUser(data)
  })
  

  useEffect (() =>{
    if (books.data){
      let uniqueGenres = []
      books.data.allBooks.map(book => book.genres.map(genre => uniqueGenres.includes(genre)?null:uniqueGenres.push(genre)))
      setBooksToShow(books.data.allBooks)
    }
  },[books.data])
  
  useEffect (() =>{
    
    console.log('useffecet', user.me);
    if (user){
      if (user.me){
        console.log(user.me)
        filterBooks(user.me.favoriteGenre)
      }
    }
  },[props.show, books.data])

  const filterBooks = (genre) => {
    if (books.data){
      const filteredBooks = books.data.allBooks.filter(book=> book.genres.includes(genre))
      setBooksToShow(filteredBooks)
    }
  }
 
  if (!props.show) {
    return null
  }
  if (!booksToShow||!user.me) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre {user.me.favoriteGenre}
      </div>
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
    </div>
  )
}

export default Books