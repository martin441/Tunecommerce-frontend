import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/reducers/userReducer";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    dispatch(setUser({}));
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} type="button" class="btn btn-primary">
      Logout
    </button>
  );
};

export default Logout;
