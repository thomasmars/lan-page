import React from 'react';
import styles from './styles/form.css'
import {
  TextField,
  SelectField,
  MenuItem,
  RaisedButton
} from 'material-ui';

export default class Form extends React.Component {
  constructor({toggleForm}) {
    super()

    this.horizon = Horizon()
    this.horizon.connect()
    this.dbGames = this.horizon('games')

    this.toggleForm = toggleForm

    this.setGameName = this.setGameName.bind(this)
    this.setPrice = this.setPrice.bind(this)
    this.setTimeRequired = this.setTimeRequired.bind(this)
    this.setProcessingPower = this.setProcessingPower.bind(this)

    this.submitGame = this.submitGame.bind(this)

    this.state = {
      currentUser: {},
      gameName: '',
      price: '',
      timeRequired: '',
      power: '',
      warnings: {
        fillIn: false,
        gameExists: false
      }
    }

    // this.horizon.currentUser().fetch().subscribe(user => {
    //   this.setState({
    //     currentUser: user
    //   })
    // })
  }

  setGameName(e, val) {
    this.setState({
      gameName: val
    })
  }

  setPrice(e, val) {
    this.setState({
      price: val
    })
  }

  setTimeRequired(e, idx, val) {
    this.setState({
      timeRequired: val
    })
  }

  setProcessingPower(e, idx, val) {
    this.setState({
      power: val
    })
  }

  isValidFields() {
    return (
      this.state.gameName.length &&
      this.state.price.length &&
      this.state.timeRequired.length &&
      this.state.power.length
    )
  }

  submitGame() {
    if (!this.state.currentUser.id) {
      return
    }

    // Validate fields
    if (!this.isValidFields()) {
      const warnings = {
        fillIn: true
      }
      this.setState({
        warnings
      })

      return
    }

    //
    // this.dbGames.fetch().defaultIfEmpty().subscribe(game => {
    //   const gameExists = game.reduce((prev, current) => {
    //     return prev || (current.gameName.toLowerCase() === this.state.gameName.toLowerCase())
    //   }, false)
    //
    //   // Store if game does not exist
    //   if (gameExists) {
    //     let warnings = {
    //       gameExists: true
    //     }
    //     this.setState({
    //       warnings
    //     })
    //   }
    //   else {
    //     this.dbGames.store({
    //       userId: this.state.currentUser.id,
    //       gameName: this.state.gameName,
    //       price: this.state.price,
    //       timeRequired: this.state.timeRequired,
    //       power: this.state.power,
    //       votes: [],
    //       date: new Date()
    //     })
    //
    //     this.toggleForm();
    //   }
    // })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div>Type in your game suggestion</div>
        {this.state.warnings.fillIn ?
          <div className={styles.warning}>Fill in all fields</div> : null}
        {this.state.warnings.gameExists ?
          <div className={styles.warning}>Game already exists</div> : null}
        <br />
        <TextField
          className={styles.text}
          hintText="Game name"
          onChange={this.setGameName}
          value={this.state.gameName}
        />
        <br />
        <TextField
          className={styles.text}
          hintText="Price"
          onChange={this.setPrice}
          value={this.state.price}
        />
        <br />
        <SelectField
          value={this.state.timeRequired}
          onChange={this.setTimeRequired}
          floatingLabelText="Time/effort required to learn it"
        >
          <MenuItem value={"Low"} primaryText="Low"/>
          <MenuItem value={"Medium"} primaryText="Medium"/>
          <MenuItem value={"High"} primaryText="High"/>
        </SelectField>
        <br />
        <SelectField
          value={this.state.power}
          onChange={this.setProcessingPower}
          floatingLabelText="Computer power required"
        >
          <MenuItem value={"Low"} primaryText="Low"/>
          <MenuItem value={"Medium"} primaryText="Medium"/>
          <MenuItem value={"High"} primaryText="High"/>
        </SelectField>
        <br />
        <RaisedButton
          label="Submit game"
          primary={true}
          onClick={this.submitGame}
        />
      </div>
    )
  }
}
