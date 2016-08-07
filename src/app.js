import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout'

var horizon = Horizon()
horizon.connect()
ReactDOM.render(<Layout/>, document.querySelector('.app'))
