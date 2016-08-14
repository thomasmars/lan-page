import {Button} from 'react-bootstrap'
import React from 'react';

export default class Logout extends React.Component {
  constructor() {
    super();
  }

  static logout() {
    Horizon.clearAuthTokens()
    window.location.href = '/';
  }

  render() {
    return (
      <Button onClick={Logout.logout}>Logout</Button>
    )
  }
}
