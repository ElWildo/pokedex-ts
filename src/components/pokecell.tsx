import React, { CSSProperties, Component } from 'react';
import '../style/pokecell.css'
import miss from "../assets/miss.png"

type PokeCellProps = {
  name: string;
  url: string;
  handleOnClick: (url: string) => void
};

type PokeCellState = {
  img: string,
  style: CSSProperties,
};

class PokeCell extends Component<PokeCellProps,PokeCellState> {
  state: PokeCellState= {
    img: null,
    style: null,
  };
  constructor(props: PokeCellProps) {
    super(props)
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => this.setState({
        style: {
          backgroundImage: data.sprites.front_default ? "url(" + data.sprites.front_default + ")" : "url(" + miss + ")"
        }
      }))
      .catch(function (error) { console.log(error) })
  }

  render() {
    return <button className="poke-cell" style={this.state.style} onClick={() => this.props.handleOnClick(this.props.url)}></button>
  }
};


export default PokeCell;