type Action = {
  type: "setUserData";
  setUserData: string;
  payload: { user_id: string; user_name: string; user_photo: string };
};

const initialState = {
  user_id: "",
  user_name: "",
  user_photo: "",
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "setUserData": {
      const userState = {
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
        user_photo: action.payload.user_photo,
      };
      return userState;
    }
    default:
      return state;
  }
};

export default userReducer;
