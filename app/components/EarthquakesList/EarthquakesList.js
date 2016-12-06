import React from 'react'
import axios from 'axios'
import EarthquakeBox from './EarthquakeBox'
import _ from 'lodash'

class EarthquakesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      earthquakeList: []
      // token: ''
    }
  }
  getEarthquakes () {
    let url = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson'
    // if (this.state.token !== '') {
    //   url += `&pageToken=${this.state.token}`
    // }
    axios.get(url)
      .then((res) => {
        this.setState({
          earthquakeList: res.data.features,
          // token: res.data.pageToken,
          date: Date.now()
        })
      })
      .catch((res) => {
        console.error(res)
      })
    }
  // deleteMessage (id) {
  //   const oldMessages = this.state.earthquakeList
  //   const newMessages = oldMessages.filter((o) => o.id !== id)
  //   this.setState({
  //     earthquakeList: newMessages
  //   })
  // }
  componentDidMount () {
    this.getEarthquakes()
  }
  render () {
    if (this.state.earthquakeList.length > 0) {
      // _.sortBy(collection, [iteratees=[_.identity]])
      const sortedEarthquakes = this.state.earthquakeList
      return (
        <div className='EarthquakesList'>
          {/* <button onClick={this.getEarthquakes.bind(this)}>Get More Earthquakes!</button> */}
          <ul>
            {sortedEarthquakes.map((earthquake, i) =>
              <EarthquakeBox
                key={i}
                properties={earthquake.properties}
                geometry={earthquake.geometry}
                // onDelete={this.deleteMessage.bind(this, earthquake.id)}
              />
            )}
          </ul>
        </div>
      )
    } else {
      return (
        <div className='EarthquakesList'>
          <h2>No earthquakes.</h2>
          {/* <button onClick={this.getEarthquakes.bind(this)}>Get More Messages??</button> */}
        </div>
      )
    }
  }
}

export default EarthquakesList
