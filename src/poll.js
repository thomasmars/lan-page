import React from 'react'

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' }
    this.games = []
    this.handleKey = this.handleKey.bind(this);
    this.saveEntry = this.saveEntry.bind(this);
  }

  saveEntry(event) {
    // Enter pressed
    if (event.which === 13) {
      // Register as new game
      this.games.push(this.state.input)
      // Clear state
      // TODO: put in action, update whole state
      this.setState({
        input: ''
      })
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
