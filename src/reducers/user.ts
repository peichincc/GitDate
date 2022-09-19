type Action = { type: "setUserData"; setUserData: string; payload: any };

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

// interface ActionA {
//   type: "getProfile";
//   getProfile: string;
// }
// interface ActionB {
//   type: "updateProfile";
//   updateProfile: string;
// }
// type Action = ActionA | ActionB;

// const userReducer = (state = 0, action: Action) => {
//   switch (action.type) {
//     case "getProfile": {
//       return state;
//     }
//     case "updateProfile": {
//       const updateProfile = 1;
//       return updateProfile;
//     }
//     default:
//       return state;
//   }
// };

export default userReducer;
