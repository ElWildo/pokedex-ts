import React, { Component, InputHTMLAttributes } from 'react';
import './style/app.css'
import PokeList from './components/pokelist'
import DetailedView from './components/detailedview'
import Pokemon from './components/pokemon'

type AppState = {
  pokemon: Pokemon|null;
};

type AppProps = {}

class App extends Component<AppProps,AppState> {
  state: AppState = {
    pokemon: null
  };
  
    // Handler for pokemon selection
    handleOnClick = (url: string) =>{
      fetch(url)
        .then(res => res.json())
        .then(data => {
          const pokemon = new Pokemon(data);
          this.setState({ pokemon });
        })
        .catch(err => console.log(err));
    }
  
    render() {
      return (
        <div className="App">
          <PokeList handleOnClick={this.handleOnClick}/>
          <DetailedView pokemon={this.state.pokemon}/>
        </div>
      );
    }
  }
export default App;