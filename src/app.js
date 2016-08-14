import './index.html'
import React from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'react-bootstrap'
import Poll from './poll';
import Logout from './logout';

var horizon = Horizon()

const authorize = function (identityProvider) {
  horizon.authEndpoint(identityProvider).subscribe((endpoint) => {
    window.location.pathname = endpoint;
  });
}

const oAuthProviders = [
  'facebook',
  // 'twitch',
  // 'google',
  'github',
  // 'twitter'
]

horizon.connect()
const loginElements = () => {
  return horizon.hasAuthToken() ? <Logout /> :
    oAuthProviders.map((provider) => {
      return <Button key={provider} onClick={authorize.bind(this, provider)}
                     bsSize="large">Log in with {provider}</Button>
    })
}

ReactDOM.render(
  <div>
    {loginElements()}
    <Poll />
  </div>
  , document.querySelector('.app')
)
