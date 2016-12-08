import React from 'react'
import axios from 'axios'
import EarthquakeBox from './EarthquakeBox'
import _ from 'lodash'

// TODO:
// figure out how to make the map of the earthquake show up when you click the button. Right now, we're just showing the latitude and longitude in paragraphs.
// allow the user to set the location for their query. api docs: http://earthquake.usgs.gov/fdsnws/event/1/
//   looks like we need to use latitude, longitude, and maxradiuskm in the query string?

class EarthquakesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      earthquakeList: [],
      page: 0,
      date: null,
      slackUrl: '',
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
    this.setState({
      selectedEarthquake: _.find(this.state.earthquakeList,
        (earthquake) => earthquake.id === id)
    })
  }
  sendToSlack (earthquake) {
    const slackUrl = 'https://hooks.slack.com/services/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'
    const message = `Check out this earthquake I found at getshakin.com! ${earthquake.properties.url}`

    axios.post(this.state.slackUrl, JSON.stringify({
      username: this.state.username,
      text: message
    }))
    .then ((res) => {
      this.setState({
        username: '',
        message: ''
      })
    })
    .catch ((err) => {
      console.log(err)
    })

  }
  setLocation (e) {
    e.preventDefault()
  }
  componentDidMount () {
    this.getEarthquakes()
  }
  // don't actually need the submit button for the slack url, but it seems like it's good user design to have something to submit? not sure what other ways we could do that.
  render () {
    if (this.state.earthquakeList.length > 0) {
      const sortedEarthquakes = this.state.earthquakeList
      return (
        <div>
          <div className='setUrl'>
          <form>
            <p>Want to be able to send earthquakes to friends via Slack? Give us your url:</p>
            <input type='text' label='Url' placeholder='Your Slack integration url' value={this.state.slackUrl} onChange={(e) => this.setState({slackUrl: e.target.value})} />
            <input type='submit' />
          </form>
          </div>
          <div className='setLocation'>
            <form>
              <input type='text' />
              <input type='submit' />
            </form>
          </div>
          <div className='EarthquakesList'>
            { <button onClick={this.getEarthquakes.bind(this)}>Get More Earthquakes!</button> }
            <ul>
              {sortedEarthquakes.map((earthquake, i) =>
                <EarthquakeBox
                  key={i}
                  properties={earthquake.properties}
                  geometry={earthquake.geometry}
                  mapEarthquake={this.mapEarthquake.bind(this, earthquake.id)}
                  sendToSlack={this.sendToSlack.bind(this, earthquake)}
                />
              )}
            </ul>
            <p>Selected latitude: {this.state.selectedEarthquake ? this.state.selectedEarthquake.geometry.coordinates[1] : ''}</p>
            <p>Selected longitude: {this.state.selectedEarthquake ? this.state.selectedEarthquake.geometry.coordinates[0] : ''}</p>
          </div>
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
