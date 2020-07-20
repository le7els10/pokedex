import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUserAction, updateImageAction } from "../Redux/UsersDucks";

const Profile = () => {
  const user = useSelector((store) => store.users.user);
  const loading = useSelector((store) => store.users.loading);

  const [UserName, setUserName] = useState(user.displayName);
  const [ActiveForm, setActiveForm] = useState(false);

  const dispatch = useDispatch();

  const updateUser = () => {
    if (!UserName.trim()) {
      console.log("nombre vacio");
      return;
    }

    dispatch(updateUserAction(UserName));
    setActiveForm(false);
  };

  const getFile = (image) => {
    let currentImage = image.target.files[0];

    if (currentImage !== undefined) {
      dispatch(updateImageAction(currentImage));
    }
  };

  return (
    <div className="mt-5 text-center">
      <div className="card">
        <div className="card-body">
          <img
            src={user.photoUrl}
            alt="profile"
            width="100px"
            className="img-fluid"
          />
          <h5 className="card-title">{user.displayName}</h5>
          <p className="card-text">Email: {user.email}</p>
          <button className="btn btn-dark" onClick={() => setActiveForm(true)}>
            Editar nombre
          </button>
          <div className="custom-file mt-3">
            <input
              type="file"
              id="file"
              className="custom-file-input"
              hidden
              onChange={(e) => getFile(e)}
            />
            <label htmlFor="file" className="btn btn-dark">
              Actualizar imagen
            </label>
          </div>
        </div>
        {loading && (
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {ActiveForm && (
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Escriba nuevo nombre"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateUser()}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
