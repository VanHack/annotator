
import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        logged: true,
        data: action.user,
      };
    case USER_LOGGED_OUT:
      return {
        logged: false,
      };
    default:
      return state;
  }
};

export default userReducer;
