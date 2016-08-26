import React from 'react';
import styles from './styles/form.css'
import {
  TextField,
  SelectField,
  MenuItem,
  RaisedButton
} from 'material-ui';

export default class Form extends React.Component {
  constructor({ toggleForm }) {
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
      gameName: '',
      price: '',
      timeRequired: '',
      power: ''
    }
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
    console.log("setting timereq", val);
    console.log("what is the other ?", idx);
    this.setState({
      timeRequired: val
    })
  }

  setProcessingPower(e, idx, val) {
    this.setState({
      power: val
    })
  }

  submitGame() {
    // Store game in database
    this.horizon.currentUser().fetch().subscribe(user => {
      // TODO: Check if gamename already exists
      console.log("storing state", this.state);

      this.dbGames.store({
        userId: user.id,
        gameName: this.state.gameName,
        price: this.state.price,
        timeRequired: this.state.timeRequired,
        power: this.state.power,
        votes: 0,
        date: new Date()
      })

      // Clear state
      this.setState({
        gameName: '',
        price: '',
        timeRequired: '',
        power: ''
      })
    })

    console.log("toggle form from form");
    this.toggleForm();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div>Type in your game suggestion</div>
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
