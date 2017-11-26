
import React from 'react';
import PropTypes from 'prop-types';
import { PDFJS } from 'pdfjs-dist/build/pdf.combined';

import ClickWrapper from '@/components/ClickWrapper';

class PDFDocument extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.destroyPDFJSComponents = this.destroyPDFJSComponents.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.zoom = this.zoom.bind(this);

    this.eventBus = new PDFJS.EventBus();
    this.eventBus.on('pagesloaded', () => {
      // Get text layer to add highlights and annotations
    });

    this.state = {
      file: null,
      zoom: 1.0,
    };
  }

  componentDidMount() {
    this.pdfViewer = new PDFJS.PDFViewer({
      container: this.rootContainer,
      eventBus: this.eventBus,
    });
    this.loadFile(this.props.document.content);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.document.content !== newProps.document.content) {
      this.destroyPDFJSComponents();
      this.setState({
        file: null,
        pdfViewer: null,
        zoom: 1.0,
      });
      this.loadFile(newProps.document.content);
    }
  }

  componentWillUnmount() {
    this.destroyPDFJSComponents();
  }

  destroyPDFJSComponents() {
    this.pdfViewer.setDocument(null);
    if (this.state.file) {
      this.state.file.destroy();
    }
  }

  loadFile(url) {
    const loadingTask = PDFJS.getDocument(url);
    loadingTask.promise.then((file) => {
      this.pdfViewer.setDocument(file);
      this.setState({ file });
    });
  }

  zoom(amount) {
    const zoom = this.state.zoom + amount;
    if ((zoom >= 0.25) && (zoom <= 3.0)) {
      this.pdfViewer.currentScale = zoom;
      this.setState({ zoom });
    }
  }

  render() {
    return (
      <div className="document-content">
        <div className="document-header">
          <ClickWrapper onClick={this.zoom} param={-0.25}>
            <i className="material-icons">remove</i>
          </ClickWrapper>
          <div>{this.pdfViewer && (100.0 * this.pdfViewer.currentScale)}%</div>
          <ClickWrapper onClick={this.zoom} param={0.25}>
            <i className="material-icons">add</i>
          </ClickWrapper>
        </div>
        <div className="pdf-document" ref={(c) => { this.rootContainer = c; }}>
          <div className="pdfViewer" />
        </div>
      </div>
    );
  }
}

PDFDocument.propTypes = {
  document: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default PDFDocument;
