import React from 'react'

const books = [
  { title: 'Harry Potter', author: 'J.K. Rowling' },
  { title: 'Hop on Pop', author: 'Dr. Suess' },
  { title: 'Moby Dick', author: 'Herman Melville' },
  { title: 'Ulysses', author: 'James Joyce' },
  { title: 'Catch 22', author: 'Someone' },
  { title: 'American Gods', author: 'Neil Gaiman' }
]

class BooksList extends React.Component {
  render () {
    return (
      <div className='BooksList'>
        <ul>
          {/* create an anonymous function to list <li>title by author</li> */}
          {books.map((book, i) =>
            <li key={i}>{book.title} by {book.author}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default BooksList
