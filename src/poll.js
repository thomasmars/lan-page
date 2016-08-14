import React from 'react'

class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.horizon = Horizon();
    this.dbGames = this.horizon('games');
    this.dbGames.fetch().subscribe(items => {
      items.forEach(item => {
        console.log("item", item);
      })
      }
    );
    this.state = { input: '' }
    this.games = []
    this.handleKey = this.handleKey.bind(this);
    this.saveEntry = this.saveEntry.bind(this);
  }

  saveEntry(event) {
    // Enter pressed
    if (event.which === 13) {
      // Register as new game
      const gameName = this.state.input;
      this.games.push(this.state.input)

      // Store in database
      // this.dbGames.store()
      this.horizon.currentUser().fetch().subscribe(user => {
        this.dbGames.store({
          userId: user.id,
          game: gameName,
          date: new Date()
        })

        // Clear state
        // TODO: put in action, update whole state
        this.setState({
          input: ''
        })
      });
    }
  }

  handleKey(event) {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    return (
      <div>
        <label>Type in your game suggestion
          <input onChange={this.handleKey} onKeyDown={this.saveEntry} value={this.state.input}/>
        </label>
        <div>Registered games:</div>
        {this.games.map((game) => {
          return <div key={game}>{game}</div>
        })}
      </div>
    )
  }
}

export default Poll
