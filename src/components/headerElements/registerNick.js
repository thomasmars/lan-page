import React from 'react'
import {Snackbar, TextField, FlatButton} from 'material-ui'
import styles from './styles/registerNick.css'
import Welcome from './components/welcome'

export default class RegisterNick extends React.Component {
  constructor() {
    super()

    this.horizon = Horizon()
    this.horizon.connect()

    this.registerName = this.registerName.bind(this)
    this.updateName = this.updateName.bind(this)
    this.closeSnackBar = this.closeSnackBar.bind(this)

    this.state = {
      hasLoadedData: false,
      userName: '',
      input: '',
      showSnackBar: false
    }
  }

  registerName() {
    if (this.state.input.length) {
      // this.horizon.currentUser().fetch().subscribe(user => {
      //   user.name = this.state.input
      //   this.horizon('users').update({
      //     id: user.id,
      //     name: user.name
      //   })
      //
      //   this.setState({
      //     input: '',
      //     userName: user.name,
      //     showSnackBar: true
      //   })
      // })
    }
  }

  componentDidMount() {
    // this.horizon.currentUser().fetch().subscribe(user => {
    //   this.setState({
    //     hasLoadedData: true,
    //     userName: user.name || ''
    //   })
    // })
  }

  updateName(e, val) {
    this.setState({
      input: val
    })
  }

  closeSnackBar() {
    this.setState({
      showSnackBar: false
    })
  }

  render() {
    let welcomeMessage;

    // Get user info
    if (this.state.hasLoadedData) {
      if (this.state.userName) {
        welcomeMessage = (
          <Welcome
            registerName={this.registerName}
            input={this.state.input}
            userName={this.state.userName}
            updateName={this.updateName}
          />
        )
      }
      else {
        welcomeMessage = (
          <div>
            <TextField
              style={{width: "300px"}}
              hintText="Register nickname before proceeding"
              onChange={this.updateName}
              value={this.state.input}
            />
            <FlatButton
              style={{marginLeft: "1em"}}
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
        <Snackbar
          open={this.state.showSnackBar}
          message={`Added nickname: ${this.state.userName}`}
          autoHideDuration={3000}
          onRequestClose={this.closeSnackBar}
        />
      </div>
    )
  }
}
