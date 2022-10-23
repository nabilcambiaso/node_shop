import { SET_LOGIN } from "../types";

const initialState = {
  email:'',
  password:'',
};

export default function (state = initialState, action:any) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN:
      return {
        ...state,
        email: payload.email,
        password: payload.password,
      };

    default:
      return state;
  }
}
