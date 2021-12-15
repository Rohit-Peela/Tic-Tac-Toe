import React, { Component } from 'react';



    const font_style = {
        textAlign:"center",
        fontFamily: "Nunito"
        
    }

    const footer = {
      display:"flex",
      justifyContent:"center",
      padding:"10px",
      padding:"20px",
      color:"aliceblue",
      textAlign:"center"
    }


class Footer extends Component {
  
  render() {
    return (
      <footer style={footer} >
         <label style={font_style}>Copyright &copy; {new Date().getFullYear()}, Rohit Peela</label>
      </footer>
    );
  }
}

export default Footer;
