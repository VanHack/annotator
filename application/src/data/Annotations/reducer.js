
import { ADD_ANNOTATION, LIST_ANNOTATIONS } from './actions';

// It should generates immutable lists inside the normalized
// annotation map, but let's keep that way for the sake of time =)
const documentReducer = (state = {}, action) => {
  if ((action.type === ADD_ANNOTATION) || (action.type === LIST_ANNOTATIONS)) {
    return Object.assign({}, action.annotations);
  }
  return state;
};

export default documentReducer;
