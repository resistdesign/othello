import T from 'prop-types';
import React, {PureComponent} from 'react';
import Style from './GameSpace.less';

const {GameSpace: ClassName} = Style;

export default class GameSpace extends PureComponent {
  static propTypes = {
    className: T.string,
    value: T.number,
    currentPlayerValue: T.number,
    playerValueComponentMap: T.objectOf(
      T.node
    ),
    space: T.shape({
      row: T.number,
      column: T.number
    }),
    onRollOver: T.func,
    onClick: T.func
  };

  state = {
    hovering: false
  };

  onRollOver = () => {
    const {
      onRollOver,
      space
    } = this.props;

    this.setState({
      hovering: true
    });

    if (onRollOver instanceof Function) {
      onRollOver(space);
    }
  };

  onRollOut = () => {
    this.setState({
      hovering: false
    });
  };

  onClick = () => {
    const {
      onClick,
      space
    } = this.props;

    if (onClick instanceof Function) {
      onClick(space);
    }
  };

  render() {
    const {hovering} = this.state;
    const {
      className = '',
      value = 0,
      currentPlayerValue,
      playerValueComponentMap = {}
    } = this.props;
    const previewCurrentPlayerPiece = hovering && !value;

    return (
      <div
        className={`GameSpace ${ClassName} ${className}`}
        onMouseEnter={this.onRollOver}
        onMouseLeave={this.onRollOut}
        onClick={this.onClick}
      >
        <div
          className={`PlayerPiece ${previewCurrentPlayerPiece ? 'Hovering' : ''}`}
        >
          {playerValueComponentMap[previewCurrentPlayerPiece ? currentPlayerValue : value]}
        </div>
      </div>
    );
  }
}
