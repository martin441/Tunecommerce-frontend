import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/reducers/userReducer";
import axios from "axios";

const Index = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/631842?api_key=20aaa388f700453e6b5bccea8610c235&language=en-US"
      )
      .then((res) => {
        dispatch(setUser(res.data));
      });
  }, []);
  console.log(user);
  return <div>index</div>;
};

export default Index;
