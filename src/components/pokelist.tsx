import React, { Component } from 'react';
import '../style/pokelist.css'
import PokeCell from './pokecell'
import global from "../global";
import ReactDOM from 'react-dom';
import Pokemon from './pokemon';

type PokeListProps = {
    handleOnClick: (url: string) => void
};

type PokeListState = {
    apiToCall: string,
    pokemonDisplayed: Pokemon[],
    count: number,
    tot: number,
    loading: boolean
};


class PokeList extends Component<PokeListProps, PokeListState> {
    private myRef: React.RefObject<unknown>;
    state: PokeListState = {
        apiToCall: global.API + "?limit=10",
        pokemonDisplayed: [],
        count: 0,
        tot: 0,
        loading: false
    };

    constructor(props: PokeListProps) {
        super(props)
        this.myRef = React.createRef() as React.MutableRefObject<HTMLInputElement>;
    }

    // Allow lazy loading requesting new data only when the element at the end of the list reach the visible area
    handleScroll = () => {
        var el = (ReactDOM.findDOMNode(this) as Element).getBoundingClientRect()
        var lastLi = (this.myRef.current as Element).getBoundingClientRect()
        if (el.y + el.height > lastLi.y + lastLi.height && !this.state.loading && this.state.count < this.state.tot) {
            this.loadMore();
        }
    };

    loadMore = () => {
        this.listSetter()
        console.log(this.state.apiToCall)
    }

    // Build and update pokemon list
    listSetter = () => {
        this.setState({
            loading: true
        })
        fetch(this.state.apiToCall)
            .then(response => response.json())
            .then(data => this.setState({
                pokemonDisplayed: this.state.pokemonDisplayed.concat(data.results),
                apiToCall: data.next,
                loading: false,
                count: this.state.count + data.results.length,
                tot: data.count
            }))
            .catch(function (error) { console.log(error) })
    }

    // Render pokemon List
    renderList = () => {
        var pokemons = this.state.pokemonDisplayed
        return pokemons.map(
            (pokemon: Pokemon, index: number) => <PokeCell key={index} name={pokemon.name} url={pokemon.url} handleOnClick={this.props.handleOnClick} />
        )
    }

    componentDidMount() {
        this.listSetter()
        ReactDOM.findDOMNode(this).addEventListener("scroll", e => {
            this.handleScroll();
        });
    }

    render() {
        return (
            <div className="poke-list">
                {this.renderList()}
                <div className="endList" key='endList' ref={this.myRef as React.MutableRefObject<HTMLInputElement>} />
            </div>
        )
    }
}


export default PokeList;