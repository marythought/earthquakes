import React from 'react'
import { render } from 'react-dom'

import HomePage from './components/HomePage/HomePage'

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf')
}

// this is a jsx element
// js-standard is the linter of choice

// const page = (
//   <div>
//     <h1>Welcome to Code 501</h1>
//     <h2>Building Web Apps with React + Redux</h2>
//   </div>
// )

// render function can only take 1 block, 1 thing. so the page element MUST be wraped in a div

render(<HomePage />, document.getElementById('app'))
