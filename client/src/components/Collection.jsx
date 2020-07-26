import React from 'react';
import { connect } from 'react-redux';
import { Notifier } from './Notifier.jsx';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import BootstrapTable from 'react-bootstrap-table-next';
import AddIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import PublicIcon from '@material-ui/icons/Public';

// Column names for table of games
const tableColumns = [{
  dataField: 'id',
  text: 'Game ID',
  hidden: true
}, {
  dataField: 'gameInfo',
  text: 'Game',
}, {
  dataField: 'players',
  text: 'Players',
  align: 'center',
  headerAlign: 'center'
}, {
  dataField: 'playtime',
  text: 'Playtime',
  align: 'center',
  headerAlign: 'center'
}, {
  dataField: 'overallRating',
  text: 'Rating',
  align: 'center',
  headerAlign: 'center'
}, {
  dataField: 'remove',
  text: '',
  align: 'center',
  style: { width: '50px' },
  headerStyle: { width: '50px' }
}];

class _Collection extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Get data from database
    this.state = {
      "id": 1,
      "name": "Games I own",
      "isPrivate": false,
      "user": {
          "id": 1,
          "username": "testUser",
          "imgFileName": "https://boardathome.s3.us-east-2.amazonaws.com/user/test.jpg",
          "url": "http://localhost:3000/users/1"
      },
      "games": [
      {
        "id": 1,
        "isUserCreated": false,
        "identifierID": "kPDxpJZ8PD",
        "name": "Spirit Island",
        "year": 2016,
        "description": "Powerful Spirits have existed on this isolated island for time immemorial. They are both part of the natural world and - at the same time - something beyond nature. Native Islanders, known as the Dahan, have learned how to co-exist with the spirits, but with a healthy dose of fear and reverence. However, now, the island has been \"discovered\" by invaders from a far-off land. These would-be colonists are taking over the land and upsetting the natural balance, destroying the presence of Spirits as they go. As Spirits, you must grow in power and work together to drive the invaders from your island... before it''s too late!",
        "imgFileName": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254941010-61PJxjjnbfL.jpg",
        "minAge": 13,
        "minPlaytime": 90,
        "maxPlaytime": 120,
        "publisher": "Greater Than Games",
        "minPlayers": 1,
        "maxPlayers": 4,
        "categories": [
            "Alternate History",
            "Environmental",
            "Fantasy",
            "Fighting",
            "Mythology",
            "Renaissance",
            "Strategy",
            "Territory Building"
        ],
        "overallRating": 4.1
      },
      {
        "id": 2,
        "isUserCreated": false,
        "identifierID": "RLlDWHh7hR",
        "name": "Gloomhaven",
        "year": 2017,
        "description": "Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for traveling to this dark corner of the world. \r\n \r\nPlayers must work together out of necessity to clear out menacing dungeons and forgotten ruins. In the process they will enhance their abilities with experience and loot, discover new locations to explore and plunder, and expand an ever-branching story fueled by the decisions they make. \r\n \r\nThis is a legacy game with a persistent and changing world that is ideally played over many game sessions. After a scenario, players will make decisions on what to do, which will determine how the story continues, kind of like a \"Choose Your Own Adventure\" book. Playing through a scenario is a cooperative affair where players will fight against automated monsters using an innovative card system to determine the order of play and what a player does on their turn.",
        "imgFileName": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254920151-51ulRXlJ7LL.jpg",
        "minAge": 12,
        "minPlaytime": 60,
        "maxPlaytime": 150,
        "publisher": "Cephalofair Games",
        "minPlayers": 1,
        "maxPlayers": 4,
        "categories": [
            "Adventure",
            "Fantasy",
            "Strategy"
        ],
        "overallRating": 3.9
      },
      ],
      "url": "http://localhost:3000/collections/1"
    };
  }

  componentDidMount() {
  }

  render() {

    // TODO: Get collection data from props instead of state
    // const { collection } = this.props
    const collection = this.state;

    let tableData = collection.games;
    tableData.forEach(game => {
      game.gameInfo = <a href={game.url}><img src={game.imgFileName} height="50"/> {game.name}</a>;
      game.players = <div>{game.minPlayers} - {game.maxPlayers}</div>;
      game.playtime = <div>{game.minPlaytime} - {game.maxPlaytime} min</div>;
      game.remove = <IconButton aria-label="remove"><DeleteIcon/></IconButton>;

    });

    let privacy = collection.isPrivate ? <Chip icon={<LockIcon/>} label="Private" size="small" /> : <Chip icon={<PublicIcon/>} label="Public" size="small" />

    return (
      <Container className="py-3">
        <Row>
          <Col xs={12} md={8}>
            <h1>Collection Name <IconButton aria-label="edit"><EditIcon/></IconButton></h1>
            { privacy }
          </Col>
          <Col>
            <Button variant="contained" startIcon={<AddIcon/>} size="large" className="float-md-right">Add Game</Button>
          </Col>
        </Row>
        <BootstrapTable
          keyField="id"
          data={ tableData }
          columns={ tableColumns }
          bordered={ false }
        />
      </Container>
    );
  }
}

export const Collection = connect(null, null)(_Collection);
