
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HTMLDocument from '@/components/documents/HTMLDocument';
import PDFDocument from '@/components/documents/PDFDocument';
import { list } from '@/data/Documents/actions';

class DocumentViewer extends React.Component {
  constructor(props) {
    super(props);
    props.list();
  }

  render() {
    const doc = this.props.documents[this.props.match.params.id];
    let content = <i>Loading...</i>;
    if (doc) {
      if (doc.type === 'html') {
        content = <HTMLDocument document={doc} />;
      } else {
        content = <PDFDocument document={doc} />;
      }
    }
    return (
      <div className="document-view">
        {content}
      </div>
    );
  }
}

DocumentViewer.propTypes = {
  documents: PropTypes.shape({}).isRequired,
  list: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  documents: state.documents,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ list }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DocumentViewer);
