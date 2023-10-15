import React, { Component } from 'react';
import '../style/detailedview.css';
import Pokemon from './pokemon';

type DetailViewProps = {
  pokemon: Pokemon | null;
};

function isPokemonAndExist(pokemon: Pokemon): boolean{
  return (pokemon instanceof Pokemon && !!pokemon)
}

class DetailView extends Component<DetailViewProps> {

  constructor(props: DetailViewProps) {
    super(props);
  }

  render() {
    var pokemon = this.props.pokemon
    var dataname = isPokemonAndExist(pokemon)? "ID: #" + pokemon.id + " " + pokemon.name : null;
    var datatype = isPokemonAndExist(pokemon) ? "Type: " + pokemon.type : null;
    return (
      <section className="detail-view">
        <div className='sprite-wrapper'>
          {isPokemonAndExist(pokemon) ?
            <img src={pokemon.sprite} className='sprite-image' alt="sprite" />
            : null
          }
        </div>
        <div className='data-wrapper'>
          <h1 className='data-name'>{isPokemonAndExist(pokemon) ? dataname : null}</h1>
          <p className="data-char">{isPokemonAndExist(pokemon) ? datatype : null}</p>
        </div>
      </section>
    )
  }

}

export default DetailView;