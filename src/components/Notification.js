import React from 'react'

const Notification = ({ message, className }) => {
  if (message) {
    return (
      <div>
        <p className={className}>{message}</p>
      </div>
    )
  }
  return null
}

export default Notification
