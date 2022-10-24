export const setUserData = (
  user_id: string,
  user_name: string,
  user_photo: string
) => {
  return {
    type: "setUserData",
    payload: { user_id, user_name, user_photo },
  };
};

export const signin = () => {
  return { type: "SIGN_IN" };
};
