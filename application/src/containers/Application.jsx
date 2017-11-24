import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '@/components/navigation/Navbar';

import HomeView from '@/views/Home';
import NotFound from '@/views/NotFound';

const App = ({ location }) => (
  <div>
    <Navbar location={location} />
    <main>
      <Switch>
        <Route path="/" location={location} exact component={HomeView} />

        <Route path="*" location={location} component={NotFound} />
      </Switch>
    </main>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
