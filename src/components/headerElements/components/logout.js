import { RaisedButton } from 'material-ui'
import React from 'react';
import styles from './styles/logout.css'

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
      <RaisedButton
        className={styles.logout}
        onClick={Logout.logout}
        secondary={true}
      >
        Logout
      </RaisedButton>
    )
  }
}
