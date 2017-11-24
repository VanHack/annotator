
import { combineReducers } from 'redux';

import annotations from './Annotations/reducer';
import documents from './Documents/reducer';
import user from './User/reducer';

const rootReducer = combineReducers({ annotations, documents, user });

export default rootReducer;
