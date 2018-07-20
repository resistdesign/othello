import T from 'prop-types';
import React, {PureComponent} from 'react';
import Style from './GameSpace.less';

const {GameSpace: ClassName} = Style;

export default class GameSpace extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div
        className={`GameSpace ${ClassName}`}
      >

      </div>
    );
  }
}
