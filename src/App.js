import React, { Component } from 'react';
import AppProvider from './AppProvider';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const appClass = {
  width:"100%",
  maxWidth:"640px",
  minWidth:"360px",
  margin:"50px auto",
  backgroundColor:"#5D3B3F",
  boxShadow:"rgba(0, 0, 0, 0.2) 0px 5px 30px 0px",
  borderRadius:"25px"
}

class App extends Component {
  render() {
    return (
      <AppProvider>
        <div style={appClass} >
          <Header />
          <Main />
          <Footer />
        </div>
      </AppProvider>
    );
  }
}

export default App;
