import 'normalize.css';
import '../Assets/Fonts/Hugtophia/stylesheet.css';
import {hot} from 'react-hot-loader';
import React, {Component} from 'react';
import Style from './Othello.less';
import {GAME_END_STATES, GAME_STATES} from './Constants';
import GameBoard from './GameBoard';
import {
  getFlippableValuesFromMatrix,
  getGameState,
  getMatrixWithFlippedValues,
  getNextPlayer, getValueCountInMatrix
} from './Utils';
import PlayerScore from './PlayerScore';

const {
  Othello: ClassName,
  PlayerPiece,
  Player_1,
  Player_2
} = Style;
const PLAYERS = {
  PLAYER_1: {
    name: 'Player 1',
    value: 1
  },
  PLAYER_2: {
    name: 'Player 2',
    value: 2
  }
};
const PLAYER_LIST = Object
  .keys(PLAYERS)
  .map(k => PLAYERS[k]);
const GAME_CONFIG = {
  ROWS: 8,
  COLUMNS: 8
};
const INITIAL_MATRIX = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, PLAYERS.PLAYER_1.value, PLAYERS.PLAYER_2.value, 0, 0, 0],
  [0, 0, 0, PLAYERS.PLAYER_2.value, PLAYERS.PLAYER_1.value, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];
const PLAYER_VALUE_COMPONENT_MAP = {
  [PLAYERS.PLAYER_1.value]: (
    <div
      className={`${PlayerPiece} ${Player_1}`}
    >

    </div>
  ),
  [PLAYERS.PLAYER_2.value]: (
    <div
      className={`${PlayerPiece} ${Player_2}`}
    >

    </div>
  )
};

class Othello extends Component {
  state = {
    scoreMap: Object
      .keys(PLAYERS)
      .reduce((acc, k) => {
        const {value} = PLAYERS[k];

        acc[value] = 0;

        return acc;
      }, {}),
    currentPlayer: PLAYERS.PLAYER_1,
    matrix: INITIAL_MATRIX,
    gameState: GAME_STATES.NEW,
    potentialValuesToFlip: [],
    ghostSpace: undefined
  };

  onSpaceRollOver = (ghostSpace = {}) => {
    const {
      currentPlayer: {value} = {},
      matrix = []
    } = this.state;
    const {row, column} = ghostSpace;

    this.setState({
      potentialValuesToFlip: getFlippableValuesFromMatrix(
        value,
        row,
        column,
        matrix,
        GAME_CONFIG.ROWS,
        GAME_CONFIG.COLUMNS
      ),
      ghostSpace
    });
  };

  onSpaceClick = ({row, column} = {}) => {
    const {
      currentPlayer = {},
      matrix
    } = this.state;
    const {value: currentPlayerValue} = currentPlayer;
    const flippedValues = getFlippableValuesFromMatrix(
      currentPlayerValue,
      row,
      column,
      matrix,
      GAME_CONFIG.ROWS,
      GAME_CONFIG.COLUMNS
    );

    if (flippedValues instanceof Array && flippedValues.length) {
      const newMatrix = getMatrixWithFlippedValues(
        matrix,
        [
          ...flippedValues,
          {
            value: currentPlayerValue,
            row,
            column
          }
        ],
        currentPlayerValue
      );

      this.setState({
        scoreMap: PLAYER_LIST
          .reduce((acc, {value} = {}) => {
            acc[value] = getValueCountInMatrix(newMatrix, value);

            return acc;
          }, {}),
        currentPlayer: getNextPlayer(
          PLAYER_LIST,
          currentPlayer,
          newMatrix,
          GAME_CONFIG.ROWS,
          GAME_CONFIG.COLUMNS
        ),
        matrix: newMatrix,
        gameState: getGameState(
          PLAYER_LIST,
          currentPlayer,
          matrix,
          INITIAL_MATRIX,
          GAME_CONFIG.ROWS,
          GAME_CONFIG.COLUMNS
        )
      });
    }
  };

  onRollGameBoardOut = () => {
    this.setState({
      potentialValuesToFlip: [],
      ghostSpace: undefined
    });
  };

  render() {
    const {
      scoreMap = {},
      currentPlayer = {},
      matrix = [],
      gameState = '',
      potentialValuesToFlip = [],
      ghostSpace
    } = this.state;
    const {value: currentPlayerValue} = currentPlayer;
    const enabled = GAME_END_STATES.indexOf(gameState) === -1;

    return (
      <div
        className={`Othello ${ClassName}`}
      >
        <div
          className='Title'
        >
          Othello
        </div>
        <div
          className='Layout'
        >
          <PlayerScore
            active={currentPlayerValue === PLAYERS.PLAYER_1.value}
            score={scoreMap[PLAYERS.PLAYER_1.value]}
            playerName={PLAYERS.PLAYER_1.name}
          />
          <div
            className='GameBoard'
          >
            <GameBoard
              enabled={enabled}
              matrix={matrix}
              potentialValuesToFlip={potentialValuesToFlip}
              ghostSpace={ghostSpace}
              currentPlayerValue={currentPlayerValue}
              playerValueComponentMap={PLAYER_VALUE_COMPONENT_MAP}
              onSpaceRollOver={this.onSpaceRollOver}
              onSpaceClick={this.onSpaceClick}
              onRollOut={this.onRollGameBoardOut}
            />
          </div>
          <PlayerScore
            active={currentPlayerValue === PLAYERS.PLAYER_2.value}
            score={scoreMap[PLAYERS.PLAYER_2.value]}
            playerName={PLAYERS.PLAYER_2.name}
          />
        </div>
      </div>
    );
  }
}

export default hot(module)(Othello);
