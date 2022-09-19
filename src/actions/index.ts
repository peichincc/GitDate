// import { CartActionTypes } from "./reducer";

export const setUserData = (user_id: any, user_name: any, user_photo: any) => {
  return {
    type: "setUserData",
    payload: { user_id, user_name, user_photo },
  };
};

export const signin = () => {
  return { type: "SIGN_IN" };
};
