import React from 'react'
import styles from './styles/register.css'
import Form from './form'
import {FloatingActionButton, Snackbar} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class Register extends React.Component {
  constructor() {
    super()

    this.horizon = Horizon()
    this.horizon.connect()

    this.state = {
      isShowingForm: false,
      hasUserName: false,
      showSnackBar: false
    }

    this.toggleForm = this.toggleForm.bind(this)
    this.closeSnackBar = this.closeSnackBar.bind(this)

    // this.horizon.currentUser().watch().subscribe(user => {
    //   if (user.name) {
    //     this.setState({
    //       hasUserName: true
    //     })
    //   }
    // })
  }

  toggleForm() {
    this.setState({
      isShowingForm: !this.state.isShowingForm,
      showSnackBar: this.state.isShowingForm
    })
  }

  closeSnackBar() {
    this.setState({
      showSnackBar: false
    })
  }

  render() {
    let registerGame = <div className={styles.denied}>Log in to suggest
      games and vote.</div>

    if (this.horizon.hasAuthToken() && this.state.hasUserName) {


      if (!this.state.isShowingForm) {
        registerGame = (
          <FloatingActionButton onClick={this.toggleForm}>
            <ContentAdd />
          </FloatingActionButton>
        )
      }
      else {
        registerGame = (
          <Form toggleForm={this.toggleForm}/>
        )
      }
    }

    return (
      <div className={styles.wrapper}>
        {registerGame}
        <Snackbar
          open={this.state.showSnackBar}
          message={`Added game`}
          autoHideDuration={3000}
          onRequestClose={this.closeSnackBar}
        />
      </div>
    )
  }
}
