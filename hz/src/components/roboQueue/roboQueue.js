import React from 'react'

class RoboQueue extends React.Component {
  constructor() {
    super()

    this.horizon = Horizon()
    this.horizon.connect()
    this.roboQueue = this.horizon('roboQueue')
    this.currentUser = {}

    this.state = {
      currentQueue: []
    }

    this.horizon.currentUser().fetch().subscribe(user => {
      this.currentUser = user
    })

    this.roboQueue.watch().subscribe(queue => {
      this.setState({
        currentQueue: queue.map(x => x.command)
      })
    })
  }

  saveCommand(cmd) {
    // Save command to database

    this.roboQueue.store({
      userId: this.currentUser.id,
      date: new Date(),
      command: cmd
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.saveCommand.bind(this, 'f')}>F</button>
        <button onClick={this.saveCommand.bind(this, 'fl')}>FL</button>
        <button onClick={this.saveCommand.bind(this, 'fr')}>FR</button>
        <button onClick={this.saveCommand.bind(this, 'b')}>B</button>
        <button onClick={this.saveCommand.bind(this, 'bl')}>BL</button>
        <button onClick={this.saveCommand.bind(this, 'br')}>BR</button>
        <button onClick={this.saveCommand.bind(this, 'exit')}>EXIT</button>
        <div>Here will be a list of current queue:</div>
        <div>{this.state.currentQueue.map((x, idx) => <div key={idx}>{x}</div>)}
        </div>
      </div>
    )
  }
}

export default RoboQueue
