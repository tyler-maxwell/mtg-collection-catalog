import UsersAPI from "../utils/usersAPI";

const initialState = {
  isLoggedIn: false,
  userInfo: null
};

const reducer = (state = initialState, action) => {
  if (action.type === "GETUSER") {
    const token = localStorage.getItem("token");
    console.log("getUser, token:", token);
    // Pass token to secured route
    UsersAPI.getCurrentUser(token).then(response => {
      if (response.data.user) {
        console.table(response.data.user);
        return {
          ...state,
          loggedIn: true,
          userInfo: {
            id: response.data.user._id,
            username: response.data.user.username,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.email
          }
        };
        // this.setState({
        //   loggedIn: true,
        //   user: {
        //     id: response.data.user._id,
        //     username: response.data.user.username,
        //     firstName: response.data.user.firstName,
        //     lastName: response.data.user.lastName,
        //     email: response.data.user.email
        //   }
        // });
      } else {
        console.log("There is no user: ", response.data);
        this.handleLogout();
        return {
          ...state,
          userInfo: null
        };
        // this.setState({
        //   user: null
        // });
      }
    });
    return state;
  }
  return state;
};

export default reducer;
