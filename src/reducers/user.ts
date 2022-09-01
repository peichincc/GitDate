interface ActionA {
  type: "getProfile";
  getProfile: string;
}
interface ActionB {
  type: "updateProfile";
  updateProfile: string;
}
type Action = ActionA | ActionB;

const userReducer = (state = 0, action: Action) => {
  switch (action.type) {
    case "getProfile": {
      return state;
    }
    case "updateProfile": {
      const updateProfile = 1;
      return updateProfile;
    }
    default:
      return state;
  }
};

export default userReducer;
