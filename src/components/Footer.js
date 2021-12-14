import React, { Component } from 'react';
import './Footer.css';



    const fontChange = {
        fontFamily: "Nunito",
        textAlign:"center"
    }

    const date = new Date().getFullYear();

class Footer extends Component {
  
  render() {
    return (
      <footer className="class_footer">
         <label style={fontChange}>Copyright &copy; {date}, Rohit Peela</label>
      </footer>
    );
  }
}

export default Footer;
