import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || ""
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const RegisterUser = async (userInfo) => {
    const userObj = {};
    userInfo.forEach((value, key) => (userObj[key] = value));
    setUserData(userObj);

    return axios
      .post("https://simplor.herokuapp.com/api/user/register", userData, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        const { avatar, email, first_name, last_name, password, token } =
          response.data;
        localStorage.setItem("userToken", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(token);
        setFirstName(first_name);
        setAvatar(avatar);
        setLastName(last_name);
        setEmail(email);
        setPassword(password);
        // forward the response, just in case
        // it's needed down the promise chain
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  const loginUser = async (credentials) => {
    return axios
      .post("https://simplor.herokuapp.com/api/user/login", credentials, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        const { email, password, token, refresh } = response.data;
        const newData = { email, password };
        setUserData(newData);
        localStorage.setItem("userToken", JSON.stringify(token));
        localStorage.setItem("refreshToken", JSON.stringify(refresh));
        localStorage.setItem("user", JSON.stringify(newData));
        setToken(token);
        setEmail(email);
        setPassword(password);
        setRefreshToken(refresh);
        // forward the response, just in case
        // it's needed down the promise chain
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  const logoutUser = async () => {
    const userRefresh = JSON.parse(localStorage.getItem("refreshToken"));
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.getItem("refreshToken");
    return axios
      .post("https://simplor.herokuapp.com/api/user/logout", userRefresh)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        RegisterUser,
        loginUser,
        logoutUser,
        token,
        refreshToken,
        firstName,
        lastName,
        phone,
        email,
        password,
        avatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
