import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleCreateBlog,
}) => {
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <table>
          <tbody>
            <tr>
              <td>title:</td>
              <td>
                <input
                  type='text'
                  name='title'
                  value={title}
                  onChange={handleTitleChange}
                  id='inputTitle'
                />
              </td>
            </tr>
            <tr>
              <td>author:</td>
              <td>
                <input
                  type='text'
                  name='author'
                  value={author}
                  onChange={handleAuthorChange}
                  id='inputAuthor'
                />
              </td>
            </tr>
            <tr>
              <td>url:</td>
              <td>
                <input
                  type='text'
                  name='url'
                  value={url}
                  onChange={handleUrlChange}
                  id='inputUrl'
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button id='createButton' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  handleCreateBlog: PropTypes.func.isRequired,
}

export default CreateBlogForm
