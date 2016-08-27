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

class Games extends React.Component {
  constructor(props) {
    super(props);

    this.horizon = Horizon();
    this.horizon.connect();
    this.dbGames = this.horizon('games')

    this.horizon.currentUser().fetch().subscribe(user => {
      this.dbGames.watch().subscribe(items => {
        const updatedGames = items.map((game) => {
          const isChecked = game.votes.includes(user.id)
          return { game, isChecked }
        })
        updatedGames.sort((game1, game2) => {
          return game2.game.votes.length - game1.game.votes.length;
        })

        this.setState({
          games: updatedGames
        })
      })
    })


    this.isAuthenticated = this.horizon.hasAuthToken();

    this.state = {
      games: []
    }
  }

  render() {
    return (
      <Table fixedHeader={true}
             fixedFooter={false}
             selectable={false}
             multiSelectable={false}>
        <TableHeader displaySelectAll={false}
                     adjustForCheckbox={false}
                     enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Votes</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Time to learn</TableHeaderColumn>
            <TableHeaderColumn>CPU power</TableHeaderColumn>
            {this.isAuthenticated ? <TableHeaderColumn>Click to vote</TableHeaderColumn> : null}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}
                   deselectOnClickaway={false}
                   showRowHover={false}
                   stripedRows={false}>
          {this.state.games.map((game, idx) => {
            return (
              <TableRow key={idx}>
                <TableRowColumn>{game.game.votes.length}</TableRowColumn>
                <TableRowColumn>{game.game.gameName}</TableRowColumn>
                <TableRowColumn>{game.game.price}</TableRowColumn>
                <TableRowColumn>{game.game.timeRequired}</TableRowColumn>
                <TableRowColumn>{game.game.power}</TableRowColumn>
                {(() => {
                  let lastRow = null;
                  if (this.isAuthenticated) {
                    lastRow = (
                      <TableRowColumn style={{paddingLeft: "3.75em"}}>
                        <Vote isChecked={game.isChecked} gameId={game.game.id}/>
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
    )
  }
}

export default Games
