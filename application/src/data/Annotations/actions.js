
import api from './api';

export const ADD_ANNOTATION = 'annotations.ADD_ANNOTATION';
export const LIST_ANNOTATIONS = 'annotations.LIST_ANNOTATIONS';

const addAnnotation = annotations => ({
  type: ADD_ANNOTATION,
  annotations,
});
const listAnnotation = annotations => ({
  type: LIST_ANNOTATIONS,
  annotations,
});

// Async actions

export const add = (annotation, documentId) => dispatch =>
  api.add(annotation, documentId)
    .then((annotations) => {
      dispatch(addAnnotation(annotations));
    });

export const list = documentId => dispatch =>
  api.list(documentId)
    .then((annotations) => {
      dispatch(listAnnotation(annotations));
    });
