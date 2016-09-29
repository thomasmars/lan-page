import React from 'react';
import logosrc from '../../assets/logo.jpg'
import styles from './styles/logo.css';

const Logo = () => (
  <div className={styles.wrapper}>
    <img src={logosrc} className={styles.logo} />
  </div>
)

export default Logo;
