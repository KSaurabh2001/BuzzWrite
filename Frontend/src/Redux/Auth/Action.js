import { LOGIN,SIGNUP } from "./ActionType";
import { toast } from 'react-toastify';

const BASE_URL = "http://localhost:8080/auth";

export const loginAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // data = { email, password }
    });

    const result = await res.json();  // ✅ Parse JSON
    const token = result.jwtToken;    // ✅ Extract jwtToken field

    localStorage.setItem("token", token);
    console.log("JWT from backend: ", token);

    dispatch({ type: LOGIN, payload: token });
     toast.success("Login successful!");
     console.log("Login successful!");
  } catch (error) {
    console.log("Login error: ", error);
     toast.error("Login failed!");
  }
};

export const signupAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send Userdto
    });

    const result = await res.text(); // Backend returns a success message string
    console.log("Signup response: ", result);

    dispatch({ type: SIGNUP, payload: result });
    console.log("Signup successful!");
    toast.success("Signup successful!");
  } catch (error) {
    console.log("Signup error: ", error);
  }
};