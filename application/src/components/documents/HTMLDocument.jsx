import React from 'react';
import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';

class HTMLDocument extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    this.renderContent();
  }
  componentDidUpdate() {
    this.renderContent();
  }

  renderContent() {
    this.docRoot.innerHTML = this.props.document.content;
  }

  render() {
    return (
      <div className="document-content container">
        <div className="document-header">
          <div className="fill" />
        </div>

        <div className="section card-panel">
          <h4 className="center-align">{this.props.document.title}</h4>
          <h6 className="center-align">{this.props.document.author}</h6>
          <div className="html-document">
            <img src={this.props.document.image} alt="Document illustration" />
            <div ref={(c) => { this.docRoot = c; }} />
          </div>
        </div>
      </div>
    );
  }
}

HTMLDocument.propTypes = {
  document: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default HTMLDocument;
