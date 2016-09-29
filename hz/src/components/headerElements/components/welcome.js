import React from 'react'
import {IconButton, FlatButton, TextField} from 'material-ui'
import styles from './styles/welcome.css'

export default class Welcome extends React.Component {
  constructor() {
    super()

    this.editName = this.editName.bind(this)
    this.cancelEditing = this.cancelEditing.bind(this)
    this.registerName = this.registerName.bind(this)

    this.state = {
      editing: false
    }
  }

  editName() {
    this.setState({
      editing: true
    })
  }

  cancelEditing() {
    this.setState({
      editing: false
    })
  }

  registerName() {
    this.props.registerName()
    this.cancelEditing()
  }

  render() {
    let children

    if (this.state.editing) {
      children = (
        <div>
          <TextField
            style={{width: "300px"}}
            hintText="Register a new name"
            onChange={this.props.updateName}
            value={this.props.input}
          />
          <FlatButton
            style={{marginLeft: "1em"}}
            label="Ok"
            primary={true}
            onClick={this.registerName}
          />
          <FlatButton
            style={{marginLeft: "1em"}}
            label="Cancel"
            primary={true}
            onClick={this.cancelEditing}
          />
        </div>
      )
    }
    else {
      children =
        (<div>
            <div>
              <div className={styles.welcome}>
                Welcome {this.props.userName}</div>
              <IconButton
                onClick={this.editName}
                iconStyle={{fontSize: '16px'}}
                iconClassName="fa fa-pencil"/>
            </div>
            <div className={styles.small}>
              Duplicate and unknown names will be removed.
            </div>
          </div>
        )
    }

    return (
      <div>
        {children}
      </div>
    )
  }
}
