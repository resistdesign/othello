import './Utils';
import {hot} from 'react-hot-loader';
import React, {Component} from 'react';

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

class Othello extends Component {
  state = {
    currentPlayer: PLAYERS.PLAYER_1,
    matrix: INITIAL_MATRIX
  };

  render() {
    return (
      <h1>
        Othello
      </h1>
    );
  }
}

export default hot(module)(Othello);
