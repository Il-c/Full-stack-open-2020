import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {  render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  const handleBlogRemove = jest.fn()
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 345,
    user: {
      username:'TestGuy',
    }
  }
  const user = {
    username:'TestGuy'
  }
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}
        handleBlogUpdate={mockHandler}
        handleBlogRemove={handleBlogRemove}  />
    )
  })

  test('At start extra blog content is not shown', () => {
    expect(component.container).toHaveTextContent(
      'TestTitle', 'TestAuthor'
    )
    expect(component.container.querySelector('.extraBlogInfo')).toHaveStyle(
      'display: none'
    )
  })
  test('After clicking view, extra content is shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container.querySelector('.extraBlogInfo')).not.toHaveStyle(
      'display: none'
    )
  })
  test('Clikcing like 2 times causes 2 events', () => {
    const viewButton = component.getByText('view')
    const likeButton = component.getByText('like')
    fireEvent.click(viewButton)
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})