import { Routes } from "react-router";
import Router from "./Pages/Router/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserByToken } from "./Redux/User/Action";
import { useSelector } from "react-redux";


function App() {
   const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !currentUser) {
      dispatch(getUserByToken(token));
    }
  }, [token, currentUser, dispatch]);
  return (
    <div className="">
      
    <Router/>

    </div>
  );
}

export default App;


