import T from 'prop-types';
import React, {PureComponent} from 'react';
import Style from './GameSpace.less';

const {GameSpace: ClassName} = Style;

export default class GameSpace extends PureComponent {
  static propTypes = {
    className: T.string,
    value: T.number,
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

  onRollOver = () => {
    const {
      onRollOver,
      space
    } = this.props;

    if (onRollOver instanceof Function) {
      onRollOver(space);
    }
  };

  render() {
    const {
      className = '',
      value = 0
    } = this.props;

    return (
      <div
        className={`GameSpace ${ClassName} ${className}`}
        onMouseEnter={this.onRollOver}
      >
        {value}
      </div>
    );
  }
}
