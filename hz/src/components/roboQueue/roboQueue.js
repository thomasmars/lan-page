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
        <button onClick={this.saveCommand.bind(this, 'f')}>Click me</button>
        <div>Here will be a list of current queue:</div>
        <div>{this.state.currentQueue.map((x, idx) => <div key={idx}>{x}</div>)}
        </div>
      </div>
    )
  }
}

export default RoboQueue
