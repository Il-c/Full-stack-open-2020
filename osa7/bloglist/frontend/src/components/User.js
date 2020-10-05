import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = () => {
  const users = useSelector (state => state.users)

  users.map(user => user.blogs? user.blogs:user.blogs=[''])


  return(
    <>
      <h2>Users</h2>
      <Table striped >
        <thead className='blogItem'>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
      {users.map(user =>
        <tr key={user.id} className='blogItem' >
          <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
          <td>{user.blogs.length}</td>
          </tr>
        )}
        </tbody>
        </Table>
    </>
  )
}
export default User