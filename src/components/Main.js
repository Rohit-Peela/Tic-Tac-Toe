import React, { Component } from 'react';
import { TYPE_OF_PLAY, CHECK_MOVE, USER_ICON } from '../common';
import './Main.css';

const placeHolder = 'I';

const Cell = (props) => {
  const value = props.cells[props.index];
  const icon = value !== null ? USER_ICON[value] : placeHolder;
  const isDoneClass = icon !== placeHolder ? 'done' : '';
  return (
          <button
            className={`cell cell-${props.index} ${isDoneClass}`}
            onClick={() => props.humanPlay(props.index)}>
            {icon}
          </button>
  )
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.gameState.position !== "") {
      setTimeout(() => {
        this.boardRef.current.classList.add('full');
      }, 50);
    } else {
      this.boardRef.current.classList.remove('full');
    }
  }

  render() {
    return (
      <div className={`board ${this.props.gameState.position}`} ref={this.boardRef}>
        <div className="board-row">
          <Cell index={0} cells={this.props.cells} humanPlay={this.props.humanPlay} />
          <Cell index={1} cells={this.props.cells} humanPlay={this.props.humanPlay} />
          <Cell index={2} cells={this.props.cells} humanPlay={this.props.humanPlay} />
        </div>

        <div className="board-row">
          <Cell index={3} cells={this.props.cells} humanPlay={this.props.humanPlay} />
          <Cell index={4} cells={this.props.cells} humanPlay={this.props.humanPlay} />
          <Cell index={5} cells={this.props.cells} humanPlay={this.props.humanPlay} />
        </div>

        <div className="board-row">
          <Cell index={6} cells={this.props.cells} humanPlay={this.props.humanPlay}/>
          <Cell index={7} cells={this.props.cells} humanPlay={this.props.humanPlay} />
          <Cell index={8} cells={this.props.cells} humanPlay={this.props.humanPlay} />
        </div>
      </div>
    )
  }
}

class Main extends Component {
  render() {
    let textInfo = '';
    const currentIconType = this.props.currentIcon;

    if (this.props.gameState && this.props.gameState.isTie) {
      textInfo = 'Tie!';
    } else {
      if (this.props.gameType === TYPE_OF_PLAY.LOCAL) {
        if (this.props.gameState.position === "") {
          textInfo = `It's player(${USER_ICON[currentIconType]}) turn`;
        } else {
          textInfo = `Player(${USER_ICON[1 - currentIconType]}) wins!`;
        }
      } else {
        if (this.props.gameState.position === "") {
          if (this.props.playerTurn === CHECK_MOVE.LOCAL) textInfo = `It's your turn`;
          else textInfo = `It's computer turn`;
        } else {
          if (this.props.playerTurn === CHECK_MOVE.LOCAL) textInfo = `Computer win!`;
          else textInfo = `You win!`;
        }
      }
    }

    return (
      <main className="main">
        <div className="info">{textInfo}</div>
        <Board {...this.props} />
      </main>
    );
  }
}

export default Main;
