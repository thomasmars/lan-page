import React from 'react';
import Header from '../headerElements/header'
import RoboQueue from '../roboQueue/roboQueue'
import styles from './styles/content.css'

const Content = ({ oAuthProviders }) => (
  <div className={styles.wrapper}>
    <Header oAuthProviders={oAuthProviders}/>
    <RoboQueue/>
  </div>
)

export default Content;
