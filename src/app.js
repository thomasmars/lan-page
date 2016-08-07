import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout'

var horizon = Horizon({
  authType: 'token'
})
horizon.connect()
ReactDOM.render(<Layout/>, document.querySelector('.app'))
