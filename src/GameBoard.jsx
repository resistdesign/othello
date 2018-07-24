import T from 'prop-types';
import React, {PureComponent} from 'react';
import Style from './GameBoard.less';
import GameSpace from './GameSpace';

const {GameBoard: ClassName} = Style;

export default class GameBoard extends PureComponent {
  static propTypes = {
    className: T.string,
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

  onSpaceRollOver = (space) => {
    const {onSpaceRollOver} = this.props;

    if (onSpaceRollOver instanceof Function) {
      onSpaceRollOver(space);
    }
  };

  onSpaceClick = (space) => {
    const {onSpaceClick} = this.props;

    if (onSpaceClick instanceof Function) {
      onSpaceClick(space);
    }
  };

  render() {
    const {
      className = '',
      matrix = [],
      potentialValuesToFlip = [],
      playerValueComponentMap = {},
      currentPlayerValue
    } = this.props;
    const potentialValuesToFlipStrings = potentialValuesToFlip
      .map(({row = 0, column = 0} = {}) => `${row}:${column}`);

    return (
      <div
        className={`GameBoard ${ClassName} ${className}`}
      >
        {matrix
          .map((row = [], r) => (
            <div
              key={`Row:${r}`}
              className='Row'
            >
              {row
                .map((value = 0, v) => {
                  const spaceString = `${r}:${v}`;
                  const isPotentialFlip = potentialValuesToFlipStrings.indexOf(spaceString) !== -1;

                  return (
                    <GameSpace
                      key={`GameSpace:${v}`}
                      className={`Space ${isPotentialFlip ? 'Highlighted' : ''}`}
                      value={value}
                      currentPlayerValue={currentPlayerValue}
                      space={{
                        row: r,
                        column: v
                      }}
                      playerValueComponentMap={playerValueComponentMap}
                      onRollOver={this.onSpaceRollOver}
                      onClick={this.onSpaceClick}
                    />
                  );
                })}
            </div>
          ))}
      </div>
    );
  }
}
