import React, { Component } from 'react';
import router from './router'
import Header from './components/Header/Header'


class App extends Component {
  render() {
    return (
      <div >
        <Header />
        {router}
      </div>
    );
  }
}

export default App;
