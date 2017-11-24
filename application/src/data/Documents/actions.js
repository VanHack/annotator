
import api from './api';

export const DOCUMENTS_LIST = 'documents.DOCUMENT_LIST';

const documentsList = documents => ({
  type: DOCUMENTS_LIST,
  documents,
});
// Async actions

export const list = () => dispatch =>
  api.list()
    .then((documents) => {
      dispatch(documentsList(documents));
    });
