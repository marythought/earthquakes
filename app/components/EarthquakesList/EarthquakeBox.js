import React from 'react'
import format from 'date-fns/format'

const EarthquakeBox = ({ properties, geometry, mapEarthquake }) =>
  <li className='EarthquakeBox'>
    <div className='earthquake-header'>
      {/* <img src={`https://earthquake-list.appspot.com/${author.photoUrl}`} alt={author.name} /> */}
      <h4>{properties.title}</h4>
      <p>{format(properties.time, 'D MMMM YYYY, h:mm a')}</p>
      { <button onClick={mapEarthquake}>See on Map</button> }
    </div>
    <div className='earthquake-body'>
      <p><a href={properties.url}>Click for more info!</a></p>
    </div>
  </li>

const propTypes = {
  properties: React.PropTypes.object,
  geometry: React.PropTypes.object
  // onDelete: React.PropTypes.func
}

export default Object.assign(EarthquakeBox, propTypes)
