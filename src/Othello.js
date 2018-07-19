import './Utils';
import {hot} from 'react-hot-loader';
import React, {Component} from 'react';

class Othello extends Component {
  render() {
    return (
      <h1>
        Othello
      </h1>
    );
  }
}

export default hot(module)(Othello);
