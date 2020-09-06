import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
let timer;
export const authenticate = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
    });
  };
};

export const login = (email, password) => {};

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
          //console.log("data nhan ve la: ", res.data);
          dispatch(
            authenticate(
              res.data.user.id,
              res.data.token,
             
            )
          );
          const expirationDate = new Date(
            new Date().getTime() + parseInt(20)* 1000
          );
          console.log('ngay het han: ',expirationDate)
          saveDataToStorage(res.data.token, res.data.user.id, expirationDate);
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

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
