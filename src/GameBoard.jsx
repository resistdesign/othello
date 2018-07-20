import T from 'prop-types';
import React, {PureComponent} from 'react';
import Style from './GameBoard.less';

const {GameBoard: ClassName} = Style;

export default class GameBoard extends PureComponent {
  static propTypes = {
    enabled: T.bool,
    matrix: T.arrayOf(
      T.arrayOf(
        T.number
      )
    ),
    potentialValuesToFlip: T.arrayOf(
      T.shape({
        value: T.number,
        row: T.number,
        column: T.number
      })
    ),
    ghostSpace: T.shape({
      row: T.number,
      column: T.number
    }),
    currentPlayerValue: T.number,
    playerValueComponentMap: T.objectOf(
      T.node
    ),
    onSpaceRollOver: T.func,
    onSpaceClick: T.func,
    onRollOut: T.func
  };
  static defaultProps = {
    enabled: true
  };

  render() {
    return (
      <div
        className={`GameBoard ${ClassName}`}
      >

      </div>
    );
  }
}
