import './index.html'
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles/app.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Logo from './components/headerElements/logo'
import Content from './components/wrapper/content'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()
const oAuthProviders = [
  {
    providerName: 'facebook',
    iconName: 'fa fa-facebook-square'
  },
  {
    providerName: 'github',
    iconName: 'fa fa-github'
  },
  {
    providerName: 'twitch',
    iconName: 'fa fa-twitch'
  }
  // 'facebook',
  // 'twitch',
  // 'google',
  // 'github',
  // 'twitter'
]

const app = document.querySelector('.app')
app.classList.add(styles.app)

const horizon = Horizon()
horizon.connect()

const AppReact = () => (
  <div>
    <Logo />
    <Content oAuthProviders={oAuthProviders} />
  </div>
)

ReactDOM.render(
  <MuiThemeProvider>
    <AppReact/>
  </MuiThemeProvider>, app
)
