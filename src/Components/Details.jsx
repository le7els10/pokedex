import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../Redux/PokeDucks";

const Details = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getPokemonDetail());
    };

    fetchData();
  }, [dispatch]);

  const currentPokemon = useSelector((store) => store.pokemons.details);
  return currentPokemon !== undefined ? (
    <div className="card text-center">
      <div className="card-body">
        <img src={currentPokemon.image} className="img-fluid" alt="name" />
        <h4 className="card-title ">{currentPokemon.name}</h4>
        <p className="card-text ">
          Height: {currentPokemon.height} | Weight: {currentPokemon.weight}
        </p>

        <div className="card text-center pb-3">
          <h5 className="card-title mt-2">Type</h5>
          <p className="card-text">
            {JSON.parse(currentPokemon.type).map((element, i) => {
              return `${element.type.name} `;
            })}
          </p>
        </div>
        <div className="card text-center pb-3">
          <h5 className="card-title mt-2">Stats</h5>
          <ul className="list-group">
            {JSON.parse(currentPokemon.stats).map((element, i) => {
              return (
                <li className="list-group-item list-group-item-light" key={i}>
                  {`${element.stat.name} : ${element.base_stat}`}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="card text-center pb-3">
          <h5 className="card-title mt-2">Movements</h5>
          <ul className="list-group movements-list">
            {JSON.parse(currentPokemon.moves).map((element, i) => {
              return (
                <li className="list-group-item list-group-item-light" key={i}>
                  {element.move.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <p>Cargando...</p>
  );
};

export default Details;
