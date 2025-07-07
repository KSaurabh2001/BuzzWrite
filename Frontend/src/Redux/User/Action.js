import {
  EDIT_USER,
  GET_USER_BY_USERNAME,
  GET_USER_BY_TOKEN,
  SEARCH_AUTHORS,
  GET_ALL_AUTHORS,
  GET_USER_BY_ID,
  GET_USER_BY_EMAIL,
} from "./ActionType";

const BASE_URL = "http://localhost:8080/users";

export const editUser = (userId, userData, jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/edit/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(userData),
    });
    const updatedUser = await res.json();

    dispatch({ type: EDIT_USER, payload: updatedUser });
    console.log("User updated successfully:", updatedUser);
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const getUserByUsername = (username,jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/username/${username}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },

    });
    const user = await res.json();

    dispatch({ type: GET_USER_BY_USERNAME, payload: user });
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const getUserByToken = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const user = await res.json();

    dispatch({ type: GET_USER_BY_TOKEN, payload: user });
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const searchAuthors = (searchTerm, jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/search?q=${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const authors = await res.json();

    dispatch({ type: SEARCH_AUTHORS, payload: authors });
  } catch (error) {
    console.log("catch error - ", error);
  }
}

export const getAllAuthors = (jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/allAuthor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const authors = await res.json();

    dispatch({ type: GET_ALL_AUTHORS, payload: authors });
    console.log("authors" ,authors)
  } catch (error) {
    console.log("catch error - ", error);
  }
};  

export const getUserById = (userId, jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/id/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const user = await res.json();

    dispatch({ type: GET_USER_BY_ID, payload: user });
    console.log("user",user);
  } catch (error) {
    console.log("catch error - ", error);
  }
};  
export const getUserByEmail = (email, jwt) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    const user = await res.json();

    dispatch({ type: GET_USER_BY_EMAIL, payload: user });
  } catch (error) {
    console.log("catch error - ", error);
  }
};
