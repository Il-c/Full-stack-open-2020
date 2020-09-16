import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {  render, fireEvent } from '@testing-library/react'
import CreateNewBlogForm from './CreateNewBlogForm'


describe('<CreateNewBlogForm />', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <CreateNewBlogForm handleNewBlog={mockHandler}  />
    )
  })

  test('At start extra blog content is not shown', () => {
    const titleInput = component.container.querySelector('#Title')
    const authorInput = component.container.querySelector('#Author')
    const urlInput = component.container.querySelector('#Url')
    const createButton = component.getByText('Create')

    fireEvent.change(titleInput, {
      target: { value: 'testTitle' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'testAuthor' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'testUrl' }
    })
    fireEvent.submit(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('testTitle')
    expect(mockHandler.mock.calls[0][0].author).toBe('testAuthor')
    expect(mockHandler.mock.calls[0][0].url).toBe('testUrl')

  })
})