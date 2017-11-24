
import _ from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { list } from '@/data/Documents/actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.list();
  }

  render() {
    return (
      <div className="container center-align">
        <h2>Select the desired document</h2>
        <div>
          {!this.props.documents ?
            <p>Loading...</p>
            :
            <div className="document-row">
              {_.map(this.props.documents, (doc, id) => (
                <div className="document large" key={id}>
                  <div className="card-panel">
                    <h5>
                      <Link to={`/document/${id}/view`}>
                        {doc.title}
                      </Link>
                    </h5>
                    <h6>
                      by <i><a href={doc.author_url}>
                        {doc.author}
                      </a></i>
                    </h6>
                    <p className="flow-text left-align">{doc.description}</p>
                    <p className="right-align">
                      <a href={doc.url}>
                        Go to original site
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  documents: PropTypes.shape({}).isRequired,
  list: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  documents: state.documents,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ list }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
