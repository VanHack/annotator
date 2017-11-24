
import Promise from 'bluebird';

export default {
  login: () => {
    const promise = new Promise((resolve) => {
      resolve({
        name: 'Renato Oliveira',
        email: 'renatorro@comp.ufla.br',
        picture: 'renatorro@comp.ufla.br',
      });
    });
    return promise;
  },
};
