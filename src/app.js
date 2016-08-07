import './index.html'
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'


var horizon = Horizon({
  authType: 'token'
})

const authorize = function (identityProvider) {
  horizon.authEndpoint(identityProvider).subscribe((endpoint) => {
    window.location.pathname = endpoint;
  });
}

const oAuthProviders = [
  'facebook',
  'twitch',
  'google',
  'github',
  'twitter'
]

horizon.connect()
ReactDOM.render(
  <div>
    {oAuthProviders.map((provider) => {
      return <Button onClick={authorize.bind(this, provider)} bsSize="large">This is the {provider} button</Button>
    })}
  </div>
  , document.querySelector('.app')
)
