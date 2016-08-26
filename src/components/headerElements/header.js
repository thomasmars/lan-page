import React from 'react';
import Logout from './components/logout';
import Login from './components/login';
import styles from './styles/header.css';

const horizon = Horizon()
export default class Header extends React.Component {

  constructor(props) {
    super()
    this.oAuthProviders = props.oAuthProviders
  }

  render() {
    let wrapperClasses = styles.header
    let buttons

    if (horizon.hasAuthToken()) {
      wrapperClasses += ` ${styles.logout}`
      buttons = <Logout/>
    }
    else {
      wrapperClasses += ` ${styles.login}`
      buttons = this.oAuthProviders.map((provider, idx) => {
        return <Login {...provider} key={idx}/>
      })
    }

    return (
      <div className={wrapperClasses}>
        {buttons}
      </div>
    )
  }
}
