import T from 'prop-types';
import React, {PureComponent} from 'react';
import Style from './PlayerScore.less';

const {PlayerScore: ClassName} = Style;

export default class PlayerScore extends PureComponent {
  static propTypes = {
    active: T.bool,
    score: T.number,
    playerName: T.string,
    winner: T.bool
  };

  render() {
    const {
      active,
      score,
      playerName,
      winner
    } = this.props;

    return (
      <div
        className={`PlayerScore ${ClassName}`}
      >
        {winner ? (
          <div
            className='Winner'
          >
            {winner ? 'You Win!' : ''}
          </div>
        ) : undefined}
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
