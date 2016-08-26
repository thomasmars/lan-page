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
    this.dbGames = this.horizon('games');
    this.dbGames.watch().subscribe(items => {
      const updatedGames = items.map((game) => {
        console.log("watch game ? ", game);
        return game
      })

      this.setState({
        games: updatedGames
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
            console.log("game id ?", game, idx);
            console.log("index", idx);
            return (
              <TableRow key={idx}>
                <TableRowColumn>{game.votes}</TableRowColumn>
                <TableRowColumn>{game.gameName}</TableRowColumn>
                <TableRowColumn>{game.price}</TableRowColumn>
                <TableRowColumn>{game.timeRequired}</TableRowColumn>
                <TableRowColumn>{game.power}</TableRowColumn>
                {(() => {
                  console.log("inside function");
                  let lastRow = null;
                  if (this.isAuthenticated) {
                    lastRow = (
                      <TableRowColumn style={{paddingLeft: "3.75em"}}>
                        <Vote gameId={game.id}/>
                      </TableRowColumn>
                    )
                  }
                  console.log("last row", lastRow);
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
