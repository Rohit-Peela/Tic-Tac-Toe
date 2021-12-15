import React, { Component } from 'react';
import { AppContext } from '../AppProvider';
import { TYPE_OF_PLAY, CHECK_MOVE, USER_ICON } from '../common';
import './Main.css';

const placeHolder = 'I';

const Cell = (props) => {
  return (
    <AppContext.Consumer>
      {context => {
        const value = context.cells[props.index];
        const icon = value !== null ? USER_ICON[value] : placeHolder;
        const isDoneClass = icon !== placeHolder ? 'done' : '';

        return (
          <button
            className={`cell cell-${props.index} ${isDoneClass}`}
            onClick={() => context.humanPlay(props.index)}>
            {icon}
          </button>
        )
      }}
    </AppContext.Consumer>
  )
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.context.gameState.position !== "") {
      setTimeout(() => {
        this.boardRef.current.classList.add('full');
      }, 50);
    } else {
      this.boardRef.current.classList.remove('full');
    }
  }

  render() {
    return (
      <div className={`board ${this.context.gameState.position}`} ref={this.boardRef}>
        <div className="board-row">
          <Cell index={0} />
          <Cell index={1} />
          <Cell index={2} />
        </div>

        <div className="board-row">
          <Cell index={3} />
          <Cell index={4} />
          <Cell index={5} />
        </div>

        <div className="board-row">
          <Cell index={6} />
          <Cell index={7} />
          <Cell index={8} />
        </div>
      </div>
    )
  }
}
Board.contextType = AppContext;

class Main extends Component {
  render() {
    let textInfo = '';
    const currentIconType = this.context.currentIcon;

    if (this.context.gameState.isTie) {
      textInfo = 'Tie!';
    } else {
      if (this.context.gameType === TYPE_OF_PLAY.LOCAL) {
        if (this.context.gameState.position === "") {
          textInfo = `It's player(${USER_ICON[currentIconType]}) turn`;
        } else {
          textInfo = `Player(${USER_ICON[1 - currentIconType]}) wins!`;
        }
      } else {
        if (this.context.gameState.position === "") {
          if (this.context.playerTurn === CHECK_MOVE.LOCAL) textInfo = `It's your turn`;
          else textInfo = `It's computer turn`;
        } else {
          if (this.context.playerTurn === CHECK_MOVE.LOCAL) textInfo = `Computer win!`;
          else textInfo = `You win!`;
        }
      }
    }

    return (
      <main className="main">
        <div className="info">{textInfo}</div>
        <Board />
      </main>
    );
  }
}
Main.contextType = AppContext;

export default Main;
