import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//importar env
import env from "../../../config/env";

const SearchUser = () => {
  const [inputUser, setImputUser] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${env.API_BASE_URL}/api/users`, {
        withCredentials: true,
      })
      .then((res) => res.data);
    navigate("/users");
  };

  const handleSearch = (e) => {
    setImputUser(e.target.value);
  };

  return (
    <>
      <form className="d-flex ms-5 me-5" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search User"
          aria-label="Search"
          onChange={handleSearch}
        />
      </form>
    </>
  );
};

export default SearchUser;
