import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Toggle from './components/Toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => setBlogs(await blogService.getAll())
    fetchData()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const createBlogRef = useRef()
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    createBlogRef.current.toggleVisibility()
    try {
      const response = await blogService.create({
        title,
        author,
        url,
      })
      response.user = {}
      response.user.username = user.username
      const newBlogs = blogs.concat(response)
      setBlogs(newBlogs)
      setMessage(`a blog ${title} by ${author} added`)
      setTimeout(() => setMessage(null), 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLikeClick = async (blog) => {
    try {
      const newBlog = { ...blog }
      newBlog.likes += 1
      await blogService.update(newBlog)
      const newBlogs = blogs.map((blog) =>
        blog.id === newBlog.id ? newBlog : blog
      )
      setBlogs(newBlogs)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleRemoveClick = async (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      try {
        blogService.remove(blog.id)
        const newBlogs = blogs.filter((value) => value.id !== blog.id)
        setBlogs(newBlogs)
        setMessage('blog deleted')
        setTimeout(() => setMessage(null), 5000)
      } catch (error) {
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
  }

  const loginForm = () => {
    const handleUsernameChange = (event) => setUsername(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)
    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService({ username, password })
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (error) {
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }

    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <table>
            <tbody>
              <tr>
                <td>username:</td>
                <td>
                  <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </td>
              </tr>
              <tr>
                <td>password:</td>
                <td>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    const handleLogout = () => {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    }

    const sortedBlogs = blogs.map((blog) => blog)
    sortedBlogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <h2>blogs</h2>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
        <Toggle buttonLabel={'new blog'} ref={createBlogRef}>
          <CreateBlogForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            handleCreateBlog={handleCreateBlog}
          />
        </Toggle>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            handleLikeClick={handleLikeClick}
            handleRemoveClick={handleRemoveClick}
          />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Blog list</h1>
      <Notification className='error' message={errorMessage} />
      <Notification className='message' message={message} />
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App
