import miss from "../assets/miss.png"

type PokemonData = {
  id: string;
  name: string;
  sprites: {
    front_default: string | null
  };
  types: { type: { name: string } }[]
}
class Pokemon {

  private _id: string;
  private _name: string;
  private _sprite: string;
  private _type: string;
  private _url: string;

  constructor(data: PokemonData) {
    this._id = data.id;
    this._name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    this._sprite = data.sprites.front_default ? data.sprites.front_default : miss;
    this._type = data.types.map(
      (typeEl) => typeEl.type.name.charAt(0).toUpperCase() + typeEl.type.name.slice(1)
    )
      .join(", ");
  }

  public get id() {
    return this._id
  }
  public get name() {
    return this._name
  }
  public get sprite() {
    return this._sprite
  }
  public get type() {
    return this._type
  }
  public get url() {
    return this._url
  }
}

export default Pokemon;