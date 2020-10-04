import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'
import { prettyDOM } from '@testing-library/dom'

const user = {
  username: 'user',
  token: 'token',
}

const blog = {
  title: 'Title',
  author: 'Author',
  url: 'url',
  likes: 10,
  user: {
    username: 'user',
    user: 'User',
    id: 11,
  },
  id: 1,
}

test('render title and author', () => {
  const dummyHandler = () => {}
  const component = render(
    <Blog
      user={user}
      blog={blog}
      handleLikeClick={dummyHandler}
      handleRemoveClick={dummyHandler}
    />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Title')
  expect(div).toHaveTextContent('Author')
})

test('render likes and url', () => {
  const dummyHandler = () => {}
  const component = render(
    <Blog
      user={user}
      blog={blog}
      handleLikeClick={dummyHandler}
      handleRemoveClick={dummyHandler}
    />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('url')
  expect(div).toHaveTextContent('10')
})

test('clicking like button twice calls handleLikeClick twice', () => {
  const mockHandler = jest.fn()
  const dummyHandler = () => {}

  const component = render(
    <Blog
      user={user}
      blog={blog}
      handleLikeClick={mockHandler}
      handleRemoveClick={dummyHandler}
    />
  )

  fireEvent.click(component.getByText('view'))
  fireEvent.click(component.getByText('like'))
  fireEvent.click(component.getByText('like'))
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('clicking create button calls handleCreateBlog', () => {
  const mockHandler = jest.fn()
  const dummyFunction = () => {}

  const component = render(
    <CreateBlogForm
      title={''}
      setTitle={dummyFunction}
      author={''}
      setAuthor={dummyFunction}
      url={''}
      setUrl={dummyFunction}
      handleCreateBlog={mockHandler}
    />
  )
  const inputTitle = component.container.querySelector('#inputTitle')
  const inputAuthor = component.container.querySelector('#inputAuthor')
  const inputUrl = component.container.querySelector('#inputUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'Title' },
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Author' },
  })
  fireEvent.change(inputUrl, {
    target: { value: 'url' },
  })
  fireEvent.submit(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
