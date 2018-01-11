import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

class MyTargetVerse extends Component {

  render() {
    let { chapter, verse, verseText, styles} = this.props;
    let chapterVerse;

    if(this.props.dir == "rtl"){
      chapterVerse = verse + ":" + chapter + " ";
    }else{
      chapterVerse = chapter + ":" + verse + " ";
    }

    return (
      <Col md={12} sm={12} xs={12} lg={12} style={styles}>
        <div style={{direction: this.props.dir}}>
          <b>{chapterVerse}</b>
          {verseText}
        </div>
      </Col>
    );
  }
}

MyTargetVerse.propTypes = {
  chapter: PropTypes.number,
  verse: PropTypes.number,
  verseText: PropTypes.string,
  styles: PropTypes.object
};

export default MyTargetVerse;
