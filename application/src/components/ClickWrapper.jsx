import React from 'react';
import PropTypes from 'prop-types';

class ClickWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.deferClick = this.deferClick.bind(this);
  }

  deferClick(event) {
    event.preventDefault();
    this.props.onClick(this.props.param);
  }

  render() {
    return (
      <a
        {...this.props}
        role="button"
        tabIndex={0}
        onClick={this.deferClick}
      >
        {this.props.children}
      </a>
    );
  }
}

ClickWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  param: PropTypes.any.isRequired, // eslint-disable-line
};

export default ClickWrapper;
