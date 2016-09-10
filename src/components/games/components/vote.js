import React from 'react';
import {Checkbox} from 'material-ui';

export default class Vote extends React.Component {
  constructor() {
    super()

    this.horizon = Horizon()
    this.horizon.connect()
    this.dbGames = this.horizon('games');

    this.state = {
      currentUser: ''
    }

    this.horizon.currentUser().fetch().subscribe(user => {
      this.setState({
        currentUser: user.id
      })
    })
  }

  handleCheck(e, isInputChecked) {
    if (!this.state.currentUser.length) {
      return
    }

    // Update game votes
    this.dbGames.find(this.props.gameId).fetch().subscribe(game => {
      const votes = game.votes || [];
      if (isInputChecked) {
        votes.push(this.state.currentUser)
      }
      else {
        const idx = votes.indexOf(this.state.currentUser);
        if (idx >= 0) {
          votes.splice(idx, 1)
        }
      }

      this.dbGames.update({
        id: game.id,
        votes: votes
      })
    })
  }

  render() {
    return (
      <div>
        <Checkbox checked={this.props.isChecked} onCheck={this.handleCheck.bind(this)}/>
      </div>
    )
  }
}
