import React from "react";


import { useDispatch } from "react-redux";
import { getUserById, getUserByUsername } from "../../Redux/User/Action";
import { useNavigate } from "react-router";
const UserCard = ({ user }) => {
  const { id,fullName, username, email, occupation, image } = user;
  const dispatch=useDispatch();
  const navigate=useNavigate();

 const handleUser= () =>{

  dispatch(getUserById(id ,localStorage.getItem("token")))
  navigate(`/profile/${id}`)
  console.log(id)
 }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-5 transition hover:shadow-xl" onClick={handleUser}>
      <div className="flex items-center gap-4">
        <img
          src={image || `https://ui-avatars.com/api/?name=${fullName}&background=random`}
          alt={fullName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {fullName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">@{username}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
          <p className="text-sm text-indigo-500">{occupation}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
