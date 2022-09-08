// import { CartActionTypes } from "./reducer";

export const setUserData = (user_id: any, user_name: any) => {
  return {
    type: "setUserData",
    payload: { user_id, user_name },
  };
};

export const signin = () => {
  return { type: "SIGN_IN" };
};
