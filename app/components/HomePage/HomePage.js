import React from 'react'

import Bio from '../Bio/Bio'
import BooksList from '../BooksList/BooksList'
import MessagesList from '../MessagesList/MessagesList'
// const portrait = require('../../img/leo.jpg')

class HomePage extends React.Component {
  render () {
    return (
      <main>
        <Bio
          // imgSrc={portrait}
          // imgAlt='Picture of Mary and son Aurelio'
          myName='Mary Dickson Diaz'
          age='too old for this sh*t'
          pronoun={{
            nominative: 'she',
            accusative: 'her',
            possessive: 'hers',
            reflexive: 'herself'
          }}
          favoriteActivity='sleeping'
        />
        <BooksList />
        <MessagesList />
      </main>
    )
  }
}

export default HomePage
