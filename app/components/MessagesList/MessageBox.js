import React from 'react'
import format from 'date-fns/format'

const MessageBox = ({ author, message, date, onDelete }) =>
  <li className='MessageBox'>
    <div className='message-header'>
      <img src={`https://message-list.appspot.com/${author.photoUrl}`} alt={author.name} />
      <h4>{author.name}</h4>
      <p>{format(date, 'D MMMM YYYY, h:mm a')}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
    <div className='message-body'>
      <p>{message}</p>
    </div>
  </li>

const propTypes = {
  author: React.PropTypes.object,
  message: React.PropTypes.string,
  date: React.PropTypes.date,
  onDelete: React.PropTypes.func
}

export default Object.assign(MessageBox, propTypes)
