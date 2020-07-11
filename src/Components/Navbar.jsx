import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeSection } from "../Redux/UsersDucks";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const active = useSelector((store) => store.users.active);

  const close = () => {
    dispatch(closeSection());
    props.history.push("/login");
  };

  return (
    <div className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Pokedex
      </Link>
      <div className="d-flex">
        {active ? (
          <React.Fragment>
            <NavLink className="btn btn-dark mr-2" to="/" exact>
              Inicio
            </NavLink>
            <button className="btn btn-danger mr-2" onClick={() => close()}>
              Cerrar sesión
            </button>
          </React.Fragment>
        ) : (
          <NavLink className="btn btn-dark mr-2" to="/login" exact>
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);
