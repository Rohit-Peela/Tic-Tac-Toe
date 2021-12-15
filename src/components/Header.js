import React, { Component } from 'react';
import { AppContext } from '../AppProvider';
import { TYPE_OF_PLAY } from '../common';

const header = {
  textAlign:"center",
  padding:"30px 0",
  backgroundColor:"grey"
}

const heading = {
  fontSize:"3rem"
}

const unorderedList = {
  listStyleType:"none",
  display: "flex",
  paddingRight:"20",
  justifyContent: "center",
  "&:first-child":{
    borderRadius: "3px 0px 0px 3px"
  },

  "&:last-child": {
    borderRadius: "0px 3px 3px 0px"
  },
}

const link = {
  display:"inlineBlock",
  padding:"10px 15px",
  border:"1px solid #000",
  marginLeft:"-1px",
  width:"160px",
  align:"center",

}

const buttonStyle = {
  backgroundColor: "#2ab7ca",
  color: "#fff",
  border: "none",
  outline: "none",
  padding: "10px 15px",
  margin: "0 auto",
  borderRadius: "3px",
  fontSize: "1rem",
  marginTop: "15px",
  boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 15px 0px",
  "&:hover": {
    cursor:"pointer"
  },

  "&:active": {
    boxShadow:"none"
  }
}

const TypeOfGame = (props) => {
    const { value, name } = props;

    return (
      <AppContext.Consumer>
        {context => (
          <li 
            onClick={() => context.changeType(value)}
            style={link}> 
            {name} 
          </li>
        )}
      </AppContext.Consumer>
    )
}

class Header extends Component {
  render() {
    return (
      <header style={header} >
        <h1 style={heading}>Tic Tac Toe</h1>
        <ul style={unorderedList}>
          <button style={buttonStyle}><TypeOfGame value={TYPE_OF_PLAY.LOCAL} name="Play Local" /></button>
          <button style={buttonStyle}><TypeOfGame value={TYPE_OF_PLAY.COMPUTER} name="Play with Computer" /></button>
        </ul>
        <div>
          <button style={buttonStyle} onClick={() => this.context.newGame()}>New Game</button>
        </div>
      </header>
    );
  }
}

Header.contextType = AppContext;

export default Header;
