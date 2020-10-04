import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, handleLikeClick, handleRemoveClick }) => {
  const [view, setView] = useState('view')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleViewClick = () => {
    if (view === 'view') {
      setView('hide')
    } else {
      setView('view')
    }
  }

  if (blog !== null) {
    const removeButtonStyle = {
      backgroundColor: '#3D75FF',
      borderRadius: '4px',
      display: user.username === blog.user.username ? '' : 'none',
    }

    return (
      <div style={blogStyle} className='blog'>
        <div>
          {blog.title} {blog.author}
          <button onClick={handleViewClick}>{view}</button>
        </div>
        <div style={{ display: view === 'view' ? 'none' : '' }}>
          <p>
            Url: <a href={blog.url}>{blog.url}</a>
          </p>
          <p>
            Likes: {blog.likes}{' '}
            <button onClick={() => handleLikeClick(blog)}>like</button>
          </p>
          <p>Creator: {blog.user.username}</p>
          <button
            style={removeButtonStyle}
            onClick={() => handleRemoveClick(blog)}
          >
            remove
          </button>
        </div>
      </div>
    )
  }
  return null
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
}

export default Blog
