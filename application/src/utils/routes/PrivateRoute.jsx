import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ isUserAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        isUserAuthenticated
          ? <Component {...props} />
          : <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isUserAuthenticated: !!state.user.logged,
});

export default connect(
  mapStateToProps,
)(PrivateRoute);
