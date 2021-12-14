import React, { Component } from 'react';
import './Footer.css';



    const font_style = {
        textAlign:"center",
        fontFamily: "Nunito"
        
    }


class Footer extends Component {
  
  render() {
    return (
      <footer className="foot">
         <label style={font_style}>Copyright &copy; {new Date().getFullYear()}, Rohit Peela</label>
      </footer>
    );
  }
}

export default Footer;
