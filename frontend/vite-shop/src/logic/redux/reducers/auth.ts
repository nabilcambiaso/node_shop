import { SET_LOGIN } from "../types";

const initialState = {
  email:'',
  token:'',
};

export default function (state = initialState, action:any) {
  const { type, payload } = action;
  console.log("payload",payload)
  switch (type) {
    case SET_LOGIN:
      return {
        ...state,
        email: payload.email,
        token: payload.token,
      };

    default:
      return state;
  }
}
