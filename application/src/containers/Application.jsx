import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import GuestRoute from '@/utils/routes/GuestRoute';
import Navbar from '@/components/navigation/Navbar';

import NotFound from '@/views/NotFound';

const App = ({ location }) => (
  <div>
    <Navbar location={location} />
    <main>
      <Switch>
        <GuestRoute path="/" location={location} exact component={NotFound} />

        <GuestRoute path="/login" location={location} exact component={NotFound} />
        <GuestRoute path="/register" location={location} exact component={NotFound} />
        <GuestRoute path="/forgot-password" location={location} exact component={NotFound} />
        <GuestRoute
          path="/reset-password/:token"
          location={location}
          exact
          component={NotFound}
        />

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
