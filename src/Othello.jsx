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
const INITIAL_STATE = {
  confirmStartNewGame: false,
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

class Othello extends Component {
  state = {
    ...INITIAL_STATE
  };

  onRequestNewGame = () => {
    this.setState({
      confirmStartNewGame: true
    });
  };

  onStartNewGame = () => {
    this.setState({
      ...INITIAL_STATE
    });
  };

  onCancelNewGame = () => {
    this.setState({
      confirmStartNewGame: false
    });
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
          newMatrix,
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
      confirmStartNewGame,
      scoreMap = {},
      currentPlayer = {},
      matrix = [],
      gameState = '',
      potentialValuesToFlip = [],
      ghostSpace
    } = this.state;
    const {value: currentPlayerValue} = currentPlayer;
    const gameOver = GAME_END_STATES.indexOf(gameState) !== -1;
    const player1Score = scoreMap[PLAYERS.PLAYER_1.value];
    const player2Score = scoreMap[PLAYERS.PLAYER_2.value];

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
            score={player1Score}
            playerName={PLAYERS.PLAYER_1.name}
            winner={gameOver && (player1Score > player2Score)}
          />
          <div
            className={`GameBoard ${gameOver ? 'Disabled' : ''}`}
          >
            <GameBoard
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
            score={player2Score}
            playerName={PLAYERS.PLAYER_2.name}
            winner={gameOver && (player2Score > player1Score)}
          />
        </div>
        {confirmStartNewGame ? (
          <div
            className='NewGameMessage'
          >
            <div
              className='Message'
            >
              Are you sure you want to start a new game?
            </div>
            <div
              className='Answers'
            >
              <div
                className='Button'
                onClick={this.onStartNewGame}
              >
                Yes!
              </div>
              <div
                className='Button'
                onClick={this.onCancelNewGame}
              >
                No
              </div>
            </div>
          </div>
        ) : (
          <div
            className='Controls'
          >
            <div
              className={`Button ${gameState === GAME_STATES.NEW ? 'Disabled' : ''}`}
              onClick={this.onRequestNewGame}
            >
              New Game
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default hot(module)(Othello);
