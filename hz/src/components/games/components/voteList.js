import React from 'react'
import {
  Dialog,
  FlatButton,
  Chip,
  Avatar,
  FontIcon
} from 'material-ui'

export default class VoteList extends React.Component {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  render() {
    if (!this.props.voters || !this.props.gameName) {
      return null
    }

    const dialogActions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.props.closeDialog}
      />
    ]

    const voteList = this.props.voters.map((voter, idx) => {
      return (
        <Chip key={idx} style={{marginBottom: '0.5em'}}>
          <Avatar icon={<FontIcon
            className="material-icons">perm_identity</FontIcon>}/>
          {voter}
        </Chip>
      )
    })


    return (
      <Dialog
        title={this.props.gameName + " voters"}
        actions={dialogActions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.closeDialog}
      >
        {voteList}
      </Dialog>
    )
  }
}
