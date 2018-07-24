import T from 'prop-types';
import React, {PureComponent} from 'react';
import Style from './PlayerScore.less';

const {PlayerScore: ClassName} = Style;

export default class PlayerScore extends PureComponent {
  static propTypes = {
    active: T.bool,
    score: T.number,
    playerName: T.string
  };

  render() {
    const {
      active,
      score,
      playerName
    } = this.props;

    return (
      <div
        className={`PlayerScore ${ClassName}`}
      >
        <div
          className='Score'
        >
          {score}
        </div>
        <div
          className={`PlayerName ${active ? 'Active' : ''}`}
        >
          {playerName}
        </div>
      </div>
    );
  }
}
