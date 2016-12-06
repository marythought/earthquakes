import React from 'react'

import About from '../About/About'
import EarthquakesList from '../EarthquakesList/EarthquakesList'

class HomePage extends React.Component {
  render () {
    return (
      <main>
        <About />
        <EarthquakesList />
      </main>
    )
  }
}

export default HomePage
