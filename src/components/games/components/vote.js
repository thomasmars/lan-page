import React from 'react';
import {Checkbox} from 'material-ui';

export default class Vote extends React.Component {
  constructor(props) {
    super()

    this.horizon = Horizon()
    this.horizon.connect()
    this.dbGames = this.horizon('games');
    this.gameId = props.gameId;
    console.log("props", props);
  }

  handleCheck(e, isInputChecked) {
    this.dbGames.find(this.gameId).fetch().subscribe(game => {
      let votes = game.votes || 0;
      votes = votes + (isInputChecked ? 1 : - 1);
      this.dbGames.update({
        id: game.id,
        votes: votes
      })
    })
  }

  render() {
    return (
      <div>
        <Checkbox onCheck={this.handleCheck.bind(this)}/>
      </div>
    )
  }
}
