import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import React from 'react'
import Vote from './components/vote';
import {hasUserName} from '../utility/login'
import VoteList from './components/voteList'

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.horizon = Horizon();
    this.horizon.connect();
    this.dbGames = this.horizon('games')

    this.handleRowSelection = this.handleRowSelection.bind(this)
    this.closeRowSelection = this.closeRowSelection.bind(this)

    this.state = {
      hasUserName: false,
      games: [],
      users: [],
      currentGame: {
        open: false
      }
    }

    this.horizon.currentUser().watch().subscribe(() => {
      this.setState({
        hasUserName: hasUserName()
      })
    })

    this.horizon('users').watch().subscribe(dbUsers => {
      const users = dbUsers.map(user => {
        return {
          id: user.id,
          name: user.name
        }
      })

      this.setState({
        users
      })
    })

    this.horizon.currentUser().fetch().subscribe(user => {
      this.dbGames.watch().subscribe(items => {
        const updatedGames = items.map((game) => {
          const isChecked = game.votes.includes(user.id)
          return {game, isChecked}
        })
        updatedGames.sort((game1, game2) => {
          return game2.game.votes.length - game1.game.votes.length;
        })

        this.setState({
          games: updatedGames
        })
      })
    })
  }

  handleRowSelection(rowNumber) {
    const selectedGame = this.state.games[rowNumber]
    const voterNames = selectedGame.game.votes.map(userId => {
      const userIdx = this.state.users.findIndex(user => {
        return user.id === userId;
      })
      if (userIdx > -1) {
        return this.state.users[userIdx].name
      }
      else {
        return userId
      }
    })

    this.setState({
      currentGame: {
        gameName: selectedGame.game.gameName,
        voters: voterNames,
        open: true
      }
    })
  }

  closeRowSelection() {
    this.setState({
      currentGame: {
        open: false
      }
    })
  }

  render() {
    return (
      <div>
        <Table fixedHeader={true}
               fixedFooter={false}
               selectable={true}
               multiSelectable={false}
               onRowSelection={this.handleRowSelection}
        >
          <TableHeader displaySelectAll={false}
                       adjustForCheckbox={false}
                       enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Votes</TableHeaderColumn>
              <TableHeaderColumn colSpan="2">Name</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Time to learn</TableHeaderColumn>
              <TableHeaderColumn>CPU power</TableHeaderColumn>
              {hasUserName() ?
                <TableHeaderColumn>Click to vote</TableHeaderColumn> : null}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}
                     deselectOnClickaway={false}
                     showRowHover={true}
                     stripedRows={false}>
            {this.state.games.map((game, idx) => {
              return (
                <TableRow key={idx}>
                  <TableRowColumn>{game.game.votes.length}</TableRowColumn>
                  <TableRowColumn
                    colSpan="2">{game.game.gameName}</TableRowColumn>
                  <TableRowColumn>{game.game.price}</TableRowColumn>
                  <TableRowColumn>{game.game.timeRequired}</TableRowColumn>
                  <TableRowColumn>{game.game.power}</TableRowColumn>
                  {(() => {
                    let lastRow = null;
                    if (hasUserName()) {
                      lastRow = (
                        <TableRowColumn style={{paddingLeft: "3.75em"}}>
                          <Vote isChecked={game.isChecked}
                                gameId={game.game.id}/>
                        </TableRowColumn>
                      )
                    }
                    return lastRow;
                  })()}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <VoteList closeDialog={this.closeRowSelection} {...this.state.currentGame}/>
      </div>
    )
  }
}

export default Games
