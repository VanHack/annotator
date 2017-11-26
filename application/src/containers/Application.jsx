import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import DocumentViewer from '@/views/DocumentViewer';
import HomeView from '@/views/Home';
import NotFound from '@/views/NotFound';

const App = ({ location }) => (
  <main>
    <Switch>
      <Route path="/" location={location} exact component={HomeView} />
      <Route path="/document/:id/view" location={location} exact component={DocumentViewer} />

      <Route path="*" location={location} component={NotFound} />
    </Switch>
  </main>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
