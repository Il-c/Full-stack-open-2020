  
import React ,{ useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {

  const [name, setName] = useState('')
  const [whenBorn, setWhenBorn] = useState('')

  const [editAuthor]= useMutation(EDIT_AUTHOR,{
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const authors = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if (authors.loading) {
    return <div>loading...</div>
  }
  
  const updateAuthor = async (event) => {
    event.preventDefault()
    
    console.log('update author...',name)
    const born = (Number(whenBorn))
    await editAuthor({ variables: { name, born } })

    setName('')
    setWhenBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={props.token?{visibility:'visible'}:{visibility:'hidden'}}>
      <h3>Set birthyear</h3>
      <div>
        name
        <select value={name}
            onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map(a =>
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          )}
        </select>
      </div>
      <div>
        born
        <input value={whenBorn}
            onChange={({ target }) => setWhenBorn(target.value)}/> 
      </div> 
      <button onClick={updateAuthor} type="button">update author</button>
      </div>
    </div>
  )
}

export default Authors
