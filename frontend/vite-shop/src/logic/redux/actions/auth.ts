import { SET_LOGIN } from "../types";


export const loginAction = (email: string, password: string, callback: Function) =>
  async (dispatch: any) => {
    try {
      console.log(email, password)
      await fetch(`http://localhost:5500/user/login`, {
        method: "post",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response.success) {
            dispatch({
              type: SET_LOGIN,
              payload: response,
            })
            callback(true);
          } else {
            callback(false);
          }
          console.log(response);
        });
    } catch (err) {
      console.log(err);
      callback(false);
    }
  };
