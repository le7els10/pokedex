import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../Redux/UsersDucks";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const dispatch = useDispatch();

  const loading = useSelector((store) => store.users.loading);
  const active = useSelector((store) => store.users.active);

  useEffect(() => {
    if (active) {
      props.history.push("/");
    }
  }, [active, props.history]);

  return (
    <div className="mt-5 text-center">
      <h3>Ingreso Google</h3>
      <hr />
      <button
        className="btn btn-dark"
        onClick={() => dispatch(loginUserAction())}
        disabled={loading}
      >
        Acceder
      </button>
    </div>
  );
};

export default withRouter(Login);
