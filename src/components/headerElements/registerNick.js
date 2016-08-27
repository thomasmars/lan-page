import React from 'react'
import {TextField, FlatButton} from 'material-ui'
import styles from './styles/registerNick.css'

export default class RegisterNick extends React.Component {
  constructor() {
    super()

    this.horizon = Horizon()
    this.horizon.connect()

    this.registerName = this.registerName.bind(this)
    this.updateName = this.updateName.bind(this)

    this.state = {
      hasLoadedData: false,
      userName: '',
      input: ''
    }
  }

  registerName() {
    if (this.state.input.length) {
      this.horizon.currentUser().fetch().subscribe(user => {
        user.name = this.state.input
        this.horizon('users').update({
          id: user.id,
          name: user.name
        })

        this.setState({
          input: '',
          userName: user.name
        })
      })
    }
  }

  componentDidMount() {
    this.horizon.currentUser().fetch().subscribe(user => {
      this.setState({
        hasLoadedData: true,
        userName: user.name || ''
      })
    })
  }

  updateName(e, val) {
    this.setState({
      input: val
    })
  }

  render() {
    let welcomeMessage;

    // Get user info
    if (this.state.hasLoadedData) {
      if (this.state.userName) {
        welcomeMessage = (
          <div>
            Welcome {this.state.userName}
          </div>
        )
      }
      else {
        welcomeMessage = (
          <div>
            <TextField
              hintText="Register name before proceeding"
              onChange={this.updateName}
              value={this.state.input}
            />
            <FlatButton
              label="Ok"
              primary={true}
              onClick={this.registerName}
            />
          </div>
        )
      }
    }

    return (
      <div className={styles.wrapper}>
        {welcomeMessage}
      </div>
    )
  }
}
