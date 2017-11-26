
import _ from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import PDFJSLib from 'pdfjs-dist';

import ClickWrapper from '@/components/ClickWrapper';

/* eslint no-console:0 */

class PDFDocument extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.destroyFile = this.destroyFile.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.renderPages = this.renderPages.bind(this);
    this.zoom = this.zoom.bind(this);

    this.state = {
      canvas: [],
      file: null,
      pages: [],
      zoom: 1.0,
    };
  }

  componentDidMount() {
    this.loadFile(this.props.document.content);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.document.content !== newProps.document.content) {
      this.destroyFile();
      this.setState({
        canvas: [],
        file: null,
        pages: [],
      });
      this.loadFile(newProps.document.content);
    }
  }

  componentDidUpdate() {
    const pages = this.state.pages.length;
    if (pages > 0) {
      this.renderPages();
    }
  }

  componentWillUnmount() {
    this.destroyFile();
  }

  destroyFile() {
    if (this.state.file) {
      this.state.file.destroy();
    }
  }

  loadFile(url) {
    const loadingTask = PDFJSLib.getDocument(url);
    loadingTask.promise.then((file) => {
      const promises = [];
      for (let page = 1; page <= file.numPages; page += 1) {
        promises.push(file.getPage(page).then(pdfPage => (
          pdfPage
        )));
      }
      this.setState({ file });
      return Promise.all(promises);
    }).then((pages) => {
      const canvas = pages.map(page => (
        <canvas
          ref={(c) => {
            this[`canvas-${page.pageNumber}`] = c;
          }}
          key={`page-${page.pageNumber}`}
        />
      ));
      this.setState({ canvas, pages });
    }).catch((reason) => {
      console.error('Error:', reason);
    });
  }

  zoom(amount) {
    const zoom = this.state.zoom + amount;
    if ((zoom >= 0.25) && (zoom <= 3.0)) {
      this.setState({ zoom });
    }
  }

  renderPages() {
    _.each(this.state.pages, (page) => {
      const viewport = page.getViewport(this.state.zoom);
      const canvas = this[`canvas-${page.pageNumber}`];
      const canvasContext = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      page.render({ canvasContext, viewport });
    });
  }

  render() {
    return (
      <div className="document-content">
        <div className="document-header">
          <ClickWrapper
            onClick={this.zoom}
            param={-0.25}
            title="Zoom out"
          >
            <i className="material-icons">remove</i>
          </ClickWrapper>
          <div>{this.state.zoom * 100.0}%</div>
          <ClickWrapper
            onClick={this.zoom}
            param={0.25}
            title="Zoom in"
          >
            <i className="material-icons">add</i>
          </ClickWrapper>
        </div>

        <div className="pdf-document">
          {this.state.canvas}
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
