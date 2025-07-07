import {
  EDIT_USER,
  GET_USER_BY_USERNAME,
  GET_USER_BY_TOKEN,
  SEARCH_AUTHORS,
  GET_ALL_AUTHORS,
  GET_USER_BY_ID,
  GET_USER_BY_EMAIL,
} from "./ActionType";

const initialState = {
  currentUser: null,
  userByUsername: null,
  userById: null,
  userByEmail: null,
  authors: [],
  searchAuthorsResult: [],
};

export const userReducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_USER:
      return { ...store, currentUser: payload };

    case GET_USER_BY_USERNAME:
      return { ...store, userByUsername: payload };

    case GET_USER_BY_TOKEN:
      return { ...store, currentUser: payload };

    case SEARCH_AUTHORS:
      return { ...store, searchAuthorsResult: payload };

    case GET_ALL_AUTHORS:
      return { ...store, authors: payload };

    case GET_USER_BY_ID:
      return { ...store, userById: payload };

    case GET_USER_BY_EMAIL:
      return { ...store, userByEmail: payload };

    default:
      return store;
  }
};
