
import Promise from 'bluebird';

let recoveredStorage = {};
if (localStorage && localStorage.annotationsStorage) {
  recoveredStorage = JSON.parse(localStorage.annotationsStorage);
}
const FakeStorage = Object.assign({}, recoveredStorage);

export default {
  add: (annotation, documentId) => (
    new Promise((resolve) => {
      const obj = Object.assign({}, annotation, { documentId });
      if (!FakeStorage[documentId]) {
        FakeStorage[documentId] = [];
      }
      FakeStorage[documentId].push(obj);
      if (localStorage) {
        localStorage.putItem('annotationsStorage', JSON.stringify(FakeStorage));
      }
      resolve(FakeStorage);
    })
  ),

  list: () => (
    new Promise((resolve) => {
      resolve(FakeStorage);
    })
  ),
};
