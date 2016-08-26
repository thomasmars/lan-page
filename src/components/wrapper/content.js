import React from 'react';
import Header from '../headerElements/header'
import Games from '../games/games'
import Register from '../games/register'
import styles from './styles/content.css'

const Content = ({ oAuthProviders }) => (
  <div className={styles.wrapper}>
    <Header oAuthProviders={oAuthProviders}/>
    <Games/>
    <Register/>
  </div>
)

export default Content;
