import React from 'react'
import _ from 'lodash'

const Bio = ({ imgSrc, imgAlt, myName, age, pronoun, favoriteActivity }) =>
  <div className='Bio'>
    {/* <img src={imgSrc} alt={imgAlt} /> */}
    <p>{myName} is {age}.</p>
    <p>{_.capitalize(pronoun.nominative)} enjoys {favoriteActivity}.</p>
  </div>

const propTypes = {
  myName: React.PropTypes.string,
  age: React.PropTypes.number,
  pronoun: React.PropTypes.object,
  favoriteActivity: React.PropTypes.string
}

// this is like extends
export default Object.assign(Bio, propTypes)
