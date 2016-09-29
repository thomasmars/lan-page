import { RaisedButton, FontIcon } from 'material-ui'
import React from 'react';
import styles from './styles/login.css';

var horizon = Horizon()
horizon.connect()

export default (props) => {

  const authorize = (identityProvider) => {
    horizon.authEndpoint(identityProvider).subscribe((endpoint) => {
      window.location.replace(endpoint);
    })
  }

  const label = `Log in with ${props.providerName}`

  return (
    <RaisedButton
      className={styles.login}
      icon={<FontIcon className={props.iconName} />}
      onClick={authorize.bind(this, props.providerName)}
      label={label}
      primary={true}
    />
  )
}
