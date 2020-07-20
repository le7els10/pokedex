import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonsAction,
  getNextPokemonsPage,
  getPreviousPokemonsPage,
  getPokemonDetail,
} from "../Redux/PokeDucks";
import Details from "./Details";
const Pokemons = () => {
  const dispatch = useDispatch();

  const data = useSelector((store) => store.pokemons);

  useEffect(() => {
    const getPokemons = () => {
      dispatch(getPokemonsAction());
    };

    getPokemons();
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-md-6">
        <h1>Lista de Pokemones</h1>
        <div className="btn-group btn-group-toggle d-flex justify-content-center">
          {data.previous !== null && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => dispatch(getPreviousPokemonsPage())}
            >
              Previous
            </button>
          )}

          {data.next !== null && (
            <button
              className="btn btn-success"
              type="button"
              onClick={() => dispatch(getNextPokemonsPage())}
            >
              Next
            </button>
          )}
        </div>

        {
          <ul className="list-group">
            {data.results.map((item, i) => (
              <li className="list-group-item" key={i}>
                {item.name}
                <button
                  className="btn btn-success float-right btn-sm"
                  onClick={() => dispatch(getPokemonDetail(item.url))}
                >
                  Info
                </button>
              </li>
            ))}
          </ul>
        }
      </div>
      <div className="col-md-6">
        <h3>Pokemon Detail</h3>
        <Details />
      </div>
    </div>
  );
};

export default Pokemons;
