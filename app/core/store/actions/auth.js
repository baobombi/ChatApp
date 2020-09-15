import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
let timer;
export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    console.log('da di vao day')
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

/**
 *
 * @route {login}
 * @url {/api/auth} Public
 */

export const login = (email, password) => {
  return async (dispatch) => {
    const data = { email, password };
    if (email != "") {
      await axios({
        method: "POST",
        url: `http://127.0.0.1:9000/api/auth`,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          dispatch(
            authenticate(
              res.data.user.id,
              res.data.token,
              parseInt(1728000) * 1000
            )
          );
          const expirationDate = new Date(
            new Date().getTime() + parseInt(1728000) * 1000
          );
          saveDataToStorage(
            res.data.token,
            res.data.user.id,
            res.data.user.email,
            res.data.user.name,
            expirationDate
          );
        })
        .catch((err) => {
         
          let message = err.response.data.msg;
           console.log(message);
          throw new Error(message);
        });
    }
  };
};

/**
 *
 * @route {register}
 * @url {/api/users}
 */
export const register = (email, password, cpassword, name) => {
  return async (dispatch) => {
    const data = { email, password, cpassword, name };
    if (email != "") {
      await axios({
        method: "POST",
        url: `http://127.0.0.1:9000/api/users`,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          dispatch(
            authenticate(
              res.data.user.id,
              res.data.token,
              parseInt(1728000) * 1000
            )
          );
          const expirationDate = new Date(
            new Date().getTime() + parseInt(1728000) * 1000
          );
          saveDataToStorage(
            res.data.token,
            res.data.user.id,
            res.data.user.email,
            res.data.user.name,
            expirationDate
          );
        })
        .catch((err) => {
          let message = "Some thing went wrong!!!";

          if (err.response.status == 400) {
            message = err.response.data.msg;
          }
          if (err.response.status == 401) {
            message = err.response.data.msg;
          }
          throw new Error(message);
        });
    }
  };
};
export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, email, name, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      name: name,
      email: email,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
