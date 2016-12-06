import React from 'react'
import axios from 'axios'
import EarthquakeBox from './EarthquakeBox'
import _ from 'lodash'

class EarthquakesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      earthquakeList: [],
      page: 0,
      date: null,
      selectedEarthquake: null
    }
  }
  getEarthquakes () {
    let url = 'http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=10&minmagnitude=2.0'
    if (this.state.page) {
      url += `&offset=${this.state.page * 10}`
    }
    axios.get(url)
      .then((res) => {
        this.setState({
          earthquakeList: res.data.features,
          page: this.state.page += 1,
          date: Date.now()
        })
      })
      .catch((res) => {
        console.error(res)
      })
    }
  mapEarthquake (id) {
    const selectedEarthquake = _.find(this.state.earthquakeList,
          (earthquake) => earthquake.id === id)
    console.log(selectedEarthquake)
    this.setState({
      selectedEarthquake: _.find(this.state.earthquakeList,
          (earthquake) => earthquake.id === id)
    })
    console.log(this.state.selectedEarthquake)
  }
  componentDidMount () {
    this.getEarthquakes()
  }
  render () {
    if (this.state.earthquakeList.length > 0) {
      // _.sortBy(collection, [iteratees=[_.identity]])
      const sortedEarthquakes = this.state.earthquakeList
      return (
        <div className='EarthquakesList'>
          { <button onClick={this.getEarthquakes.bind(this)}>Get More Earthquakes!</button> }
          <ul>
            {sortedEarthquakes.map((earthquake, i) =>
              <EarthquakeBox
                key={i}
                properties={earthquake.properties}
                geometry={earthquake.geometry}
                mapEarthquake={this.mapEarthquake.bind(this, earthquake.id)}
              />
            )}
          </ul>
          <p>{this.state.selectedEarthquake ? this.state.selectedEarthquake.properties.name : ''}</p>
        </div>
      )
    } else {
      return (
        <div className='EarthquakesList'>
          <h2>No earthquakes.</h2>
          { <button onClick={this.getEarthquakes.bind(this)}>Get More Messages??</button> }
        </div>
      )
    }
  }
}

export default EarthquakesList
