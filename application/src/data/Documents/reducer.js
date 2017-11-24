import _ from 'underscore';
import { DOCUMENTS_LIST } from './actions';

const documentReducer = (state = {}, action) => {
  if (action.type === DOCUMENTS_LIST) {
    const normalized = {};
    _.each(action.documents, (doc) => {
      normalized[doc.id] = Object.assign({}, doc);
    });
    return normalized;
  }
  return state;
};

export default documentReducer;
